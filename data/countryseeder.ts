import db from '@/db'
import country from './country.json'
import { CountryGroupTable, ProductTable } from '@/src/db/product'
import { CountryTable } from '@/src/db/product'
import { Code } from 'lucide-react'
import { sql } from 'drizzle-orm'






const groupCount = await updateCountryGroup()
const countryCount = await updateCountry()

console.log(
  `Updated ${groupCount} country groups and ${countryCount} countries`
)

export async function updateCountryGroup() {


  const countrydata= country.map(
    ({name,recommendedDiscountPercentage})=>{
      return {name,recommendedDiscountPercentage}
    }
  )
 console.log(`countires sucessed maping${countrydata}`)

 const { rowCount} =await db.insert(CountryGroupTable).values(countrydata).onConflictDoUpdate({
  target:CountryGroupTable.name,
  set:{
    recommendedDiscountPercentage:CountryGroupTable.recommendedDiscountPercentage
  }
 })


 console.log(`countires sucessed inserted`)
 return rowCount

  
    
}
export async function updateCountry() {

  const countrygrp = await db.query.CountryGroupTable.findMany({
   columns:{
    id:true,
    name:true
   }
  })

 const data = await country.flatMap(
  ({countries, name})=>{
const countrygroup= countrygrp.find(group=>group.name===name)

if(!countrygroup){
  throw new Error(`country group ${name} not found`)
}


    return countries.map((country)=>{
      return {
        name:country.countryName,
        code:country.country,
        countryGroupId:countrygroup.id
      }
    })
  }
 )
 const {rowCount}= await db.insert(CountryTable).values(data).onConflictDoUpdate({
  target:CountryTable.code,
  set:{
    name:sql.raw(`excluded.${CountryTable.name.name}`),
    countryGroupId:sql.raw(`excluded.${CountryTable.countryGroupId.name}`)
  }
 })
 return rowCount
  


  
    
}
