import db from '@/db'

async function debugDatabase() {
    console.log('=== Database Debug ===')
    
    // Check products
    const products = await db.query.ProductTable.findMany({
        columns: {
            id: true,
            name: true,
            url: true,
            clerkUserId: true,
        },
        with: {
            productCustomization: true,
            countryGroupDiscounts: true,
        }
    })
    
    console.log('Products found:', products.length)
    products.forEach(product => {
        console.log(`- Product: ${product.name} (ID: ${product.id})`)
        console.log(`  URL: ${product.url}`)
        console.log(`  Has Customization: ${!!product.productCustomization}`)
        console.log(`  Country Group Discounts: ${product.countryGroupDiscounts?.length || 0}`)
    })
    
    // Check countries
    const countries = await db.query.CountryTable.findMany({
        columns: {
            id: true,
            name: true,
            code: true,
        },
        limit: 10 // Just first 10 for testing
    })
    
    console.log('\nCountries found:', countries.length)
    countries.forEach(country => {
        console.log(`- ${country.name} (${country.code}) - ID: ${country.id}`)
    })
    
    // Check specific country codes
    const indiaLower = await db.query.CountryTable.findFirst({
        where: ({code}, {eq}) => eq(code, 'in')
    })
    
    const indiaUpper = await db.query.CountryTable.findFirst({
        where: ({code}, {eq}) => eq(code, 'IN')
    })
    
    console.log('\nIndia lookup results:')
    console.log('- "in" (lowercase):', indiaLower ? `Found: ${indiaLower.name}` : 'Not found')
    console.log('- "IN" (uppercase):', indiaUpper ? `Found: ${indiaUpper.name}` : 'Not found')
}

debugDatabase().catch(console.error)
