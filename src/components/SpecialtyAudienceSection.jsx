import React from 'react';
import './SpecialtyAudienceSection.css';
import { ArrowRight } from 'lucide-react';

const SPECIALTIES = [
  { label: 'Orthopaedic surgeons', slug: 'orthopaedic-surgeons' },
  { label: 'Dermatologists', slug: 'dermatologists' },
  { label: 'MedSpa owners', slug: 'medspa-owners' },
  { label: 'Plastic surgeons', slug: 'plastic-surgeons' },
  { label: 'Dentists', slug: 'dentists' },
  { label: 'Ophthalmologists', slug: 'ophthalmologists' },
  { label: 'Aesthetic practitioners', slug: 'aesthetic-practitioners' },
  { label: 'Vascular surgeons', slug: 'vascular-surgeons' },
  { label: 'Private GP practices', slug: 'private-gp-practices' },
  { label: 'Cosmetic surgeons', slug: 'cosmetic-surgeons' },
  { label: 'Fertility clinics', slug: 'fertility-clinics' },
  { label: 'Spine surgeons', slug: 'spine-surgeons' },
  { label: 'Sports medicine doctors', slug: 'sports-medicine-doctors' },
  { label: 'Pain management specialists', slug: 'pain-management-specialists' },
  { label: 'Orthodontists', slug: 'orthodontists' },
  { label: 'Hair transplant surgeons', slug: 'hair-transplant-surgeons' },
  { label: 'Physiotherapists', slug: 'physiotherapists' },
  { label: 'Cardiologists', slug: 'cardiologists' },
];

export default function SpecialtyAudienceSection() {
  return (
    <section className="specialty-audience" aria-labelledby="specialty-audience-headline">
      <div className="specialty-audience__inner">
        <header className="specialty-audience__intro">
          <p className="specialty-audience__eyebrow">
            We work exclusively with private medical practices
          </p>
          <h2 id="specialty-audience-headline" className="specialty-audience__headline">
            We know your world because we&apos;ve lived in it. Find your specialty below.
          </h2>
          <p className="specialty-audience__subcopy">
            An orthopaedic surgeon in Miami and a MedSpa owner in London have different patient
            profiles, different insurance dynamics, different seasonal patterns, and different
            competitors. We build for your practice  not a template designed for someone
            else&apos;s.
          </p>
        </header>

        <nav
          className="specialty-audience__grid"
          aria-label="Specialties we help"
        >
          {SPECIALTIES.map(({ slug, label }) => (
            <a key={slug} href={`/who-we-help/${slug}`} className="specialty-audience__pill">
              {label}
            </a>
          ))}
        </nav>

        <div className="specialty-audience__footer">
          <a href="/who-we-help" className="cta cta--secondary cta--lg cta--block">
            See all specialties
            <ArrowRight size={16} />
          </a>
         
        </div>
      </div>
    </section>
  );
}
