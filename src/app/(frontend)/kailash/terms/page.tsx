import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Terms & Conditions — Kailash Pilgrimage | Mohanji',
  description:
    'Terms and conditions for participants joining the Mohanji Kailash Pilgrimage. Please read carefully before applying.',
}

export default function KailashTermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient py-20 text-center text-white">
        <div className="container">
          <h1 className="font-heading text-4xl md:text-5xl font-semibold mb-3">
            Terms & Conditions
          </h1>
          <span className="gold-divider gold-divider--center" />
          <p className="text-white/90 text-lg max-w-2xl mx-auto mt-4">
            Kailash Pilgrimage — Please read these terms carefully before submitting your application.
          </p>
        </div>
      </section>

      {/* Terms content */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="prose prose-lg max-w-none text-gray-700">

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">1. Eligibility</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Participants must be a minimum of 18 years of age at the time of the pilgrimage.</li>
                <li>Participants must be in good physical health and capable of trekking 15–22 km per day at high altitude (above 4,500m).</li>
                <li>A medical fitness certificate may be required. Participants with pre-existing cardiac, respiratory, or other serious conditions must consult their physician before applying.</li>
                <li>The Mohanji Foundation reserves the right to decline any application where the organising team determines that participation poses an unacceptable health risk to the individual or the group.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">2. Booking & Payment</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>A non-refundable deposit (amount specified at time of booking) is required to secure your place.</li>
                <li>The balance of the pilgrimage fee is due no later than 60 days before the departure date.</li>
                <li>Failure to pay the balance by the due date may result in cancellation of your booking without refund of the deposit.</li>
                <li>Prices are quoted in USD and are subject to change due to currency fluctuations or permit fee changes imposed by Chinese or Tibetan authorities.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">3. Cancellation Policy</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li><strong>More than 90 days before departure:</strong> Full refund minus the non-refundable deposit and any permit fees already paid.</li>
                <li><strong>60–90 days before departure:</strong> 50% refund of total amount paid, minus permit fees.</li>
                <li><strong>Less than 60 days before departure:</strong> No refund. We strongly recommend comprehensive travel insurance.</li>
                <li>In the event that the Mohanji Foundation cancels the pilgrimage (e.g., due to force majeure, permit denial, or safety concerns), participants will receive a full refund or the option to transfer to a future pilgrimage.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">4. Travel Insurance</h2>
              <span className="gold-divider" />
              <p className="mt-4 text-sm leading-relaxed">
                Comprehensive travel insurance is mandatory for all participants. Your policy must cover:
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Medical emergencies and hospitalisation</li>
                <li>Emergency evacuation (including helicopter evacuation from high altitude)</li>
                <li>Trip cancellation and curtailment</li>
                <li>Loss of luggage and personal effects</li>
              </ul>
              <p className="mt-3 text-sm">
                Proof of insurance must be submitted no later than 30 days before departure.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">5. Liability</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>The Mohanji Foundation, its representatives, and affiliated organisations accept no liability for injury, illness, loss, or damage incurred during the pilgrimage.</li>
                <li>Participation in the Kailash Parikrama and associated activities is entirely at the participant's own risk.</li>
                <li>The Foundation is not responsible for delays, cancellations, or changes beyond its control, including weather conditions, political situations, permit denials, or natural disasters.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">6. Conduct & Respect</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Participants are expected to conduct themselves with respect, humility, and reverence throughout the pilgrimage.</li>
                <li>Consumption of alcohol and non-vegetarian food is not permitted during the pilgrimage.</li>
                <li>Photography at sacred sites must be done respectfully and with awareness of local customs and restrictions.</li>
                <li>The Mohanji Foundation reserves the right to ask any participant to leave the group if their conduct is deemed disrespectful, harmful, or incompatible with the spirit of the pilgrimage. No refund will be given in such circumstances.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">7. Permits & Documents</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Participants are responsible for obtaining a valid visa for China and any other transit countries.</li>
                <li>The Foundation will manage the application for Tibet Travel Permits, Alien Travel Permits, and Military Area Permits. Participants must supply passport copies and passport photos by the deadline specified.</li>
                <li>Permit approval is subject to the discretion of Chinese and Tibetan authorities and cannot be guaranteed. In the event of permit denial, a full refund of permit fees will be issued.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">8. Health & Safety</h2>
              <span className="gold-divider" />
              <ul className="mt-4 space-y-2 text-sm leading-relaxed list-disc list-inside">
                <li>Participants must inform the team of any medical conditions, medications, or allergies prior to departure.</li>
                <li>The team will carry a basic first aid kit and oxygen cylinders. For serious emergencies, evacuation will be arranged but may take significant time given the remote location.</li>
                <li>Participants who cannot continue the parikrama due to altitude sickness or injury will be assisted in returning to base safely, at the participant's expense if additional transport is required.</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="font-heading text-2xl text-[#16697A] mb-3">9. Amendments</h2>
              <span className="gold-divider" />
              <p className="mt-4 text-sm leading-relaxed">
                The Mohanji Foundation reserves the right to amend these terms at any time. Participants
                will be notified of any material changes. Continued participation constitutes acceptance
                of the amended terms.
              </p>
            </div>

            <div className="bg-[#F5F5F5] rounded-lg p-6 mt-8">
              <p className="text-sm text-gray-600 leading-relaxed">
                By submitting an application for the Kailash Pilgrimage, you confirm that you have
                read, understood, and agree to these Terms & Conditions in full.
              </p>
              <div className="mt-4">
                <Link
                  href="/kailash/application"
                  className="bg-[#C95D63] text-white hover:bg-[#f4442e] px-6 py-3 rounded font-medium transition-colors"
                >
                  Apply for the Pilgrimage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
