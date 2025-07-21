DO $$ BEGIN
    -- First, change the column type to text temporarily
    ALTER TABLE "user_subscriptions" ALTER COLUMN "tiers" TYPE text;

    -- Drop the enum if it exists
    DROP TYPE IF EXISTS "public"."tiers";

    -- Create the new enum
    CREATE TYPE "public"."tiers" AS ENUM('Free', 'Basic', 'Standard', 'Premium');

    -- Convert the column back to the new enum type
    ALTER TABLE "user_subscriptions" 
        ALTER COLUMN "tiers" TYPE "public"."tiers" 
        USING "tiers"::"public"."tiers";

    -- Set the default value
    ALTER TABLE "user_subscriptions" 
        ALTER COLUMN "tiers" SET DEFAULT 'Free'::"public"."tiers";
END $$;