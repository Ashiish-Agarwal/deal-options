
import { NextRequest, NextResponse } from "next/server";
import findUserCountry from 'find-user-country';
import { headers } from "next/headers";
import { getProductForBanner } from "@/server/api/nextapi";
import { createProductView } from "@/server/actions/productDetails";
import { canRemoveBranding, canShowDsicountBanner } from "@/server/permission"; 
import { createElement } from "react";



export async function GET(
  request: NextRequest,
  
{params}:{params:Promise<{productid:string}>}
) {
  
const {productid} = await params
  try {
    console.log('GET request started', { productid });

    // Validate productid
    if (!productid || typeof productid !== 'string') {
      console.error('Invalid product ID', { productid });
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    const headersMap = await headers();
    const requestingURL = headersMap.get('referer') || headersMap.get('origin');
    console.log('Request headers', { requestingURL });

    if (!requestingURL) {
      console.warn('No URL found in headers');
    }

    const country = await getCountry();
    console.log('Country fetched', { country });

    if (!country) {
      console.error('Country not found');
      return NextResponse.json({ error: 'Country not found' }, { status: 400 });
    }

    console.log('Fetching product data', { productid, country, requestingURL });
    const bannerData = await getProductForBanner({
      id: productid,
      country,
      url: requestingURL ?? '',
    }) as {
      ProductData?: {
        id: string;
        clerkUserId: string;
        custmization: {
          locationMessage: string;
          bannerContainer: string;
          backgroundColor: string;
          textColor: string;
          fontSize: string;
          isSticky: boolean;
          classPrefix?: string | null;
        };
      };
      countrydata?: {
        id: string;
        name: string;
        code: string;
      };
      discount?: {
        coupon: string;
        percentage: number;
      };
    };
    
    const { ProductData, countrydata, discount } = bannerData;
    console.log('Product data received', { ProductData, countrydata, discount });

    if (!ProductData) {
      console.error('Product not found', { productid });
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create product view
    console.log('Creating product view', {
      productid: ProductData.id,
      userid: ProductData.clerkUserId,
      country: countrydata?.id,
    });
    
    // Only create product view if we have a valid country ID
    if (countrydata?.id) {
      await createProductView({
        productid: ProductData.id,
        userid: ProductData.clerkUserId,
        country: countrydata.id,
      });
    } else {
      console.warn('Skipping product view creation - no valid country ID found', {
        countryCode: country,
        countrydata
      });
    }

    console.log('Checking banner permission', { clerkUserId: ProductData.clerkUserId });
    const canShowBanner = await canShowDsicountBanner(ProductData.clerkUserId); // Fixed typo
    if (!canShowBanner) {
      console.warn('Banner not authorized for user', { clerkUserId: ProductData.clerkUserId });
    }

    if (!discount) {
      console.warn('No discount found', { productid });
    }

    console.log('Generating JavaScript', { productid, country, canShowBanner });
    const jsContent = await getJavaScript(
      ProductData as {
        custmization: {
          locationMessage: string;
          bannerContainer: string;
          backgroundColor: string;
          textColor: string;
          fontSize: string;
          isSticky: boolean;
          classPrefix?: string | null;
        };
      },
      country,
      discount,
      await canRemoveBranding(ProductData.clerkUserId)
    );

    console.log('JavaScript generated successfully');
    return new NextResponse(jsContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript',
      },
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function getJavaScript(
  ProductData: {
    custmization: {
      locationMessage: string;
      bannerContainer: string;
      backgroundColor: string;
      textColor: string;
      fontSize: string;
      isSticky: boolean;
      classPrefix?: string | null;
    };
  },
  country: string,
  discount: { coupon: string; percentage: number } | undefined,
  canRemoveBranding: boolean
) {
  try {
    console.log('Starting getJavaScript', {
      locationMessage: ProductData.custmization.locationMessage,
      bannerContainer: ProductData.custmization.bannerContainer,
      country,
      discount,
      canRemoveBranding,
    });

    const { renderToStaticMarkup } = await import("react-dom/server");
    const { Banner } = await import("@/components/Banner");
    console.log('React modules imported successfully');

    const mappings = {
      country,
      coupon: discount?.coupon || '',
      discount: ((discount?.percentage ?? 0) * 100).toString(),
    };
    
    console.log('Banner mappings:', mappings);
    console.log('Banner message template:', ProductData.custmization.locationMessage);

    const bannerHtml = renderToStaticMarkup(
      createElement(Banner, {
        message: ProductData.custmization.locationMessage,
        mappings,
        customization: ProductData.custmization,
        canRemoveBranding,
      })
    );
    console.log('Banner HTML generated', { bannerHtml: bannerHtml.slice(0, 50) + '...' }); // Log partial HTML to avoid clutter

    const jsContent = `
      (function() {
        const container = document.querySelector("${ProductData.custmization.bannerContainer}");
        if (!container) {
          console.warn("Banner container not found");
          return;
        }
        const banner = document.createElement("div");
        banner.innerHTML = ${JSON.stringify(bannerHtml)};
        container.prepend(...banner.children);
      })();
    `.replace(/(\r\n|\n|\r)/g, "");

    console.log('JavaScript content prepared');
    return jsContent;

    

  } catch (error) {
    console.error('Error generating JavaScript:', error);
    throw error;
  }
}

async function getCountry(): Promise<string | null> {
  try {
    console.log('Fetching user country');
    const country = await findUserCountry({ checkIsValidCountry: false });
    console.log('Raw country data', { country });

    if (!country || (Array.isArray(country) && country.length === 0)) {
      console.warn('User country not found');
      return null;
    }

    const countryResult = Array.isArray(country) ? country[0] : country;
    console.log('Processed country', { countryResult });
    return countryResult;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
}