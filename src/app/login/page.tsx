"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <main className="flex-1 flex min-h-[100dvh] items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
        className="w-full max-w-md"
      >
        <div className="double-bezel">
          <div className="double-bezel-inner p-10 md:p-14">
            
            <div className="text-center mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-umber/60 block mb-4">
                Client Access
              </span>
              <h1 className="font-serif text-4xl tracking-tighter">Fabriclicious</h1>
            </div>

            <form action={formAction} className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs uppercase tracking-widest text-umber/70">
                  Email Address
                </label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  placeholder="atelier@example.com"
                  className="luxury-input"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-xs uppercase tracking-widest text-umber/70">
                  Password
                </label>
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="luxury-input"
                />
              </div>

              {state?.error && (
                <p className="text-loam text-sm font-medium">{state.error}</p>
              )}

              <button 
                type="submit" 
                disabled={isPending}
                className="luxury-button w-full mt-4 disabled:opacity-50"
              >
                {isPending ? "Authenticating..." : "Enter"}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-hemp text-center">
              <button formAction={() => {}} className="text-xs font-mono uppercase tracking-widest text-umber/60 hover:text-umber transition-colors">
                Request Magic Link
              </button>
            </div>

          </div>
        </div>
      </motion.div>
    </main>
  );
}
