'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CountryDiscountFormSchema } from "@/conform-libs/schema"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/legacy/image"
import { UpdateCountryDiscount } from "@/server/actions/productDetails"
import { toast } from "sonner"

interface CountryGroup {
  id: string;
  name: string;
  recommendedDiscountPercentage: number | null | undefined;
  countries: {
    name: string;
    code: string;
  }[];
  discount?: {
    coupon: string;
    discountPercentage: number | undefined | null;
  };
}

interface CountryDiscountFormProps {
  id: string;
  countrygroups: CountryGroup[];
}

export function CountryDiscountForm({ id, countrygroups }: CountryDiscountFormProps) {
  const form = useForm<z.infer<typeof CountryDiscountFormSchema>>({
    resolver: zodResolver(CountryDiscountFormSchema),
    defaultValues: {
      groups: countrygroups.map((group) => {
        const discount = group.discount?.discountPercentage ?? group.recommendedDiscountPercentage;
        return {
          countryGroupid: group.id,
          coupon: group.discount?.coupon ?? '',
          discountPercentage: typeof discount === 'number' ? discount * 100 : undefined
        };
      })
    },
  });

  async function onSubmit(values: z.infer<typeof CountryDiscountFormSchema>) {

    const { error, message } = await UpdateCountryDiscount({ id }, values)
    if (error) {
      toast.error(message)
    }
    else {
      toast.success(message)
    }
  }

  const getFlagUrl = (countryCode: string) =>
    `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form Title */}
          <div className="text-center mb-8">
            
          </div>

          {/* Country Groups */}
          <div className="grid gap-6">
            {countrygroups.map((group, index) => (
              <Card 
                key={group.id} 
                className="w-full bg-gradient-to-br from-background to-accent/5 border border-border/50 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">
                        {group.name}
                      </CardTitle>
                      <Badge variant="secondary" className="w-fit mt-1">
                        {group.countries.length} {group.countries.length === 1 ? 'country' : 'countries'}
                      </Badge>
                    </div>
                    
                    {/* Recommended Discount Badge */}
                    {group.recommendedDiscountPercentage && (
                      <Badge variant="outline" className="w-fit">
                        Recommended: {(group.recommendedDiscountPercentage * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Hidden field for country group ID */}
                  <Input
                    type="hidden"
                    {...form.register(`groups.${index}.countryGroupid`)}
                  />

                  {/* Country Flags Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                      Countries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.countries.map((country) => (
                        <div
                          key={country.code}
                          className="group relative flex items-center gap-2 p-2 rounded-lg  bg-background/50 hover:bg-accent/20 transition-colors duration-200"
                          title={country.name}
                        >
                          <Image
                            className="rounded-sm object-cover transition-transform duration-200 group-hover:scale-110"
                            src={getFlagUrl(country.code)}
                            alt={`${country.name} flag`}
                            width={40}
                            height={24}
                          />
                          <span className="text-xs font-medium hidden sm:inline">
                            {country.code.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Fields Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    {/* Coupon Field */}
                    <FormField
                      control={form.control}
                      name={`groups.${index}.coupon`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            Coupon Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Enter coupon code"
                              className="w-full transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                              value={field.value ?? ''}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />

                    {/* Discount Percentage Field */}
                    <FormField
                      control={form.control}
                      name={`groups.${index}.discountPercentage`}
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <FormLabel className="text-base font-semibold flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                            Discount Percentage
                            {/* Show required indicator if coupon is filled */}
                            {form.watch(`groups.${index}.coupon`) && (
                              <span className="text-destructive text-sm">*</span>
                            )}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                type="number"
                                placeholder="0"
                                className={`w-full pr-8 transition-all duration-200 focus:ring-2 focus:ring-primary/20 ${
                                  form.formState.errors.groups?.[index]?.root ? 'border-destructive focus:ring-destructive/20' : ''
                                }`}
                                value={field.value ?? ''}
                                min={1}
                                max={100}
                                step={0.1}
                                onChange={(e) => {
                                  const value = e.target.value === '' ? '' : Number(e.target.value);
                                  field.onChange(value);
                                }}
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                                %
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                          {/* Helper text */}
                          {form.watch(`groups.${index}.coupon`) && !field.value && (
                            <p className="text-xs text-destructive/70">
                              Discount percentage is required when coupon code is provided
                            </p>
                          )}
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Group-level error message */}
                  {form.formState.errors.groups?.[index]?.root?.message && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-destructive text-xs font-bold">!</span>
                      </div>
                      <div>
                        <FormMessage className="text-destructive font-medium text-sm">
                          {form.formState.errors.groups[index].root.message}
                        </FormMessage>
                        <p className="text-xs text-destructive/80 mt-1">
                          Please provide a discount percentage when using a coupon code.
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center sm:justify-end pt-6">
            <Button variant='teal'
              disabled={form.formState.isSubmitting}
              type="submit"
              size="lg"
              className="w-full sm:w-auto min-w-32 font-semibold transition-all duration-200 hover:scale-105"
            >
              {form.formState.isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                'Save Configuration'
              )}
            </Button>
          </div>
            <p className="text-sm text-muted-foreground mt-2">
              Set up discount rates and coupon codes for different country groups 
            </p>
        </form>
      </Form>
    </div>
  );
}