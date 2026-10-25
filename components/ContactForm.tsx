'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitContactForm, ContactFormState } from '@/app/contact/actions';
import { PROBLEMS } from '@/content/problems';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full sm:w-auto font-mono text-xs font-medium uppercase tracking-mono bg-gold text-ink border-2 border-ink px-8 py-4 text-center min-h-[44px] inline-flex items-center justify-center shadow-hard btn-press hover:bg-gold/90 transition-colors disabled:opacity-50"
    >
      {pending ? 'Sending…' : 'Send your problem →'}
    </button>
  );
}

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <div className="border-2 border-ink bg-paper p-6 sm:p-10 md:p-12 shadow-hard mt-16">
      <div className="mb-8 pb-4 border-b-2 border-ink">
        <span className="font-mono text-[11px] uppercase tracking-mono text-stone block mb-1">
          BRIEF FORM
        </span>
        <h3 className="font-display font-medium text-2xl md:text-3xl text-ink">
          Tell us what is happening
        </h3>
      </div>

      <div
        aria-live="polite"
        className="mb-6 font-mono text-xs uppercase tracking-mono"
      >
        {state.success && (
          <div className="p-4 bg-gold border-2 border-ink text-ink font-medium">
            {state.message || 'Message sent.'}
          </div>
        )}
        {!state.success && state.message && (
          <div className="p-4 bg-ink border-2 border-ink text-paper">
            {state.message}
          </div>
        )}
      </div>

      {!state.success && (
        <form action={formAction} className="flex flex-col gap-6" noValidate>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-name"
              className="font-mono text-xs uppercase tracking-mono text-stone font-medium"
            >
              NAME
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              aria-describedby={state.errors?.name ? 'name-error' : undefined}
              className="bg-paper text-ink border-2 border-ink p-3 font-body text-base outline-none focus:border-gold transition-colors"
            />
            {state.errors?.name && (
              <span
                id="name-error"
                className="font-mono text-xs text-ink/80 tracking-mono"
              >
                {state.errors.name}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-email"
              className="font-mono text-xs uppercase tracking-mono text-stone font-medium"
            >
              EMAIL
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              aria-describedby={state.errors?.email ? 'email-error' : undefined}
              className="bg-paper text-ink border-2 border-ink p-3 font-body text-base outline-none focus:border-gold transition-colors"
            />
            {state.errors?.email && (
              <span
                id="email-error"
                className="font-mono text-xs text-ink/80 tracking-mono"
              >
                {state.errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-problem"
              className="font-mono text-xs uppercase tracking-mono text-stone font-medium"
            >
              WHICH PROBLEM SOUNDS FAMILIAR?
            </label>
            <select
              id="contact-problem"
              name="problem"
              required
              defaultValue=""
              aria-describedby={state.errors?.problem ? 'problem-error' : undefined}
              className="bg-paper text-ink border-2 border-ink p-3 font-body text-base outline-none focus:border-gold transition-colors cursor-pointer"
            >
              <option value="" disabled>
                Select a problem…
              </option>
              {PROBLEMS.map((p) => (
                <option key={p.id} value={p.title}>
                  {p.number} · {p.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
            {state.errors?.problem && (
              <span
                id="problem-error"
                className="font-mono text-xs text-ink/80 tracking-mono"
              >
                {state.errors.problem}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="contact-message"
              className="font-mono text-xs uppercase tracking-mono text-stone font-medium"
            >
              WHAT’S HAPPENING?
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              maxLength={2000}
              required
              aria-describedby={state.errors?.message ? 'message-error' : undefined}
              className="bg-paper text-ink border-2 border-ink p-3 font-body text-base outline-none focus:border-gold transition-colors resize-y"
            />
            {state.errors?.message && (
              <span
                id="message-error"
                className="font-mono text-xs text-ink/80 tracking-mono"
              >
                {state.errors.message}
              </span>
            )}
          </div>

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>
      )}
    </div>
  );
}
