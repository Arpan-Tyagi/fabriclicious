"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { completeOnboarding } from "./actions";
import PhoneInput from "react-phone-number-input/input";
import { useState } from "react";

export default function OnboardingPage() {
  const [state, formAction, isPending] = useActionState(completeOnboarding, null);
  const [phone, setPhone] = useState<string>();

  return (
    <main className="flex-1 flex min-h-[100dvh] items-center justify-center p-4 bg-umber text-linen">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-lg"
      >
        <div className="mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-loam block mb-4">
            Step 02 — Client Details
          </span>
          <h1 className="font-serif text-5xl tracking-tight mb-4">Welcome to the Atelier.</h1>
          <p className="font-sans text-sm text-linen/60 leading-relaxed max-w-sm">
            Please provide your details to complete your profile. A valid phone number is required for WhatsApp concierge dispatch.
          </p>
        </div>

        <form action={formAction} className="space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-xs uppercase tracking-widest text-linen/50">
                First Name
              </label>
              <input 
                id="firstName" 
                name="firstName" 
                type="text" 
                required 
                className="w-full bg-transparent border-b border-linen/20 focus:border-loam outline-none py-3 transition-colors rounded-none text-linen"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-xs uppercase tracking-widest text-linen/50">
                Last Name
              </label>
              <input 
                id="lastName" 
                name="lastName" 
                type="text" 
                required 
                className="w-full bg-transparent border-b border-linen/20 focus:border-loam outline-none py-3 transition-colors rounded-none text-linen"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="block text-xs uppercase tracking-widest text-linen/50">
              Phone Number (WhatsApp)
            </label>
            <input type="hidden" name="phone_formatted" value={phone || ""} />
            <PhoneInput
              country="US"
              value={phone}
              onChange={setPhone}
              required
              className="w-full bg-transparent border-b border-linen/20 focus:border-loam outline-none py-3 transition-colors rounded-none text-linen"
              placeholder="+1 234 567 8900"
            />
          </div>

          {state?.error && (
            <p className="text-loam text-sm">{state.error}</p>
          )}

          <div className="pt-8">
            <button 
              type="submit" 
              disabled={isPending}
              className="inline-flex items-center justify-center rounded-full bg-loam text-umber px-8 py-4 font-medium transition-transform duration-700 hover:scale-[0.98] active:scale-95 disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Enter Storefront"}
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}
