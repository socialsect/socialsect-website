'use client'

import React from 'react';
import { Link } from 'react-router-dom';
import {
  IconBone,           // Orthopaedic surgeons
  IconBodyScan,       // Dermatologists  body/skin scan
  IconSparkles,       // MedSpa owners
  IconScissors,       // Plastic surgeons  surgical scissors
  IconDental,         // Dentists
  IconEye,            // Ophthalmologists
  IconFaceId,         // Aesthetic practitioners
  IconHeartbeat,      // Vascular surgeons  pulse/vessels
  IconStethoscope,    // Private GP practices
  IconNeedle,         // Cosmetic surgeons  injections/sutures
  IconDna,            // Fertility clinics
  IconDisabled2,      // Spine surgeons  figure with back/posture
  IconRun,            // Sports medicine doctors
  IconBandage,        // Pain management specialists
  IconMedicalCross,   // Orthodontists  dental/medical cross
  IconMicroscope,     // Hair transplant surgeons  follicle/precision
  IconMassage,        // Physiotherapists
  IconActivityHeartbeat, // Cardiologists  ECG line
} from '@tabler/icons-react';
import './SpecialtyAudienceSection.css';


const ICON_PROPS = { size: 22, stroke: 1.5, color: '#695af2' };


const SPECIALTIES = [
  {
    label: 'Orthopaedic surgeons',
    slug: 'orthopaedic-surgeons',
    icon: <IconBone {...ICON_PROPS} />,
  },
  {
    label: 'Dermatologists',
    slug: 'dermatologists',
    icon: <IconBodyScan {...ICON_PROPS} />,
  },
  {
    label: 'MedSpa owners',
    slug: 'medspa-owners',
    icon: <IconSparkles {...ICON_PROPS} />,
  },
  {
    label: 'Plastic surgeons',
    slug: 'plastic-surgeons',
    icon: <IconScissors {...ICON_PROPS} />,
  },
  {
    label: 'Dentists',
    slug: 'dentists',
    icon: <IconDental {...ICON_PROPS} />,
  },
  {
    label: 'Ophthalmologists',
    slug: 'ophthalmologists',
    icon: <IconEye {...ICON_PROPS} />,
  },
  {
    label: 'Aesthetic practitioners',
    slug: 'aesthetic-practitioners',
    icon: <IconFaceId {...ICON_PROPS} />,
  },
  {
    label: 'Vascular surgeons',
    slug: 'vascular-surgeons',
    icon: <IconHeartbeat {...ICON_PROPS} />,
  },
  {
    label: 'Private GP practices',
    slug: 'private-gp-practices',
    icon: <IconStethoscope {...ICON_PROPS} />,
  },
  {
    label: 'Cosmetic surgeons',
    slug: 'cosmetic-surgeons',
    icon: <IconNeedle {...ICON_PROPS} />,
  },
  {
    label: 'Fertility clinics',
    slug: 'fertility-clinics',
    icon: <IconDna {...ICON_PROPS} />,
  },
  {
    label: 'Spine surgeons',
    slug: 'spine-surgeons',
    icon: <IconDisabled2 {...ICON_PROPS} />,
  },
  {
    label: 'Sports medicine doctors',
    slug: 'sports-medicine-doctors',
    icon: <IconRun {...ICON_PROPS} />,
  },
  {
    label: 'Pain management specialists',
    slug: 'pain-management-specialists',
    icon: <IconBandage {...ICON_PROPS} />,
  },
  {
    label: 'Orthodontists',
    slug: 'orthodontists',
    icon: <IconMedicalCross {...ICON_PROPS} />,
  },
  {
    label: 'Hair transplant surgeons',
    slug: 'hair-transplant-surgeons',
    icon: <IconMicroscope {...ICON_PROPS} />,
  },
  {
    label: 'Physiotherapists',
    slug: 'physiotherapists',
    icon: <IconMassage {...ICON_PROPS} />,
  },
  {
    label: 'Cardiologists',
    slug: 'cardiologists',
    icon: <IconActivityHeartbeat {...ICON_PROPS} />,
  },
];


export default function SpecialtyAudienceSection() {
  return (
    <section className="specialty-audience" aria-labelledby="specialty-audience-headline">
      <div className="specialty-audience__inner">

        {/* Top: headline left, map right */}
        <div className="specialty-audience__top">
          <div className="specialty-audience__intro">
            <p className="specialty-audience__eyebrow">
              We work exclusively with private medical practices
            </p>
            <h2 id="specialty-audience-headline" className="specialty-audience__headline">
              We know your world<br />
              because we&apos;ve lived in it.<br />
              <em>Find your specialty below.</em>
            </h2>
            <p className="specialty-audience__subcopy">
              An orthopaedic surgeon in Miami and a MedSpa owner in London have different
              patient profiles, different insurance dynamics, different seasonal patterns,
              and different competitors.{' '}
              <strong>We build for your practice, not a template designed for someone else&apos;s.</strong>
            </p>
          </div>

          <div className="specialty-audience__map" aria-hidden="true">
            <img
            draggable="false"
              src="/map.webp"
              alt=""
              className="specialty-audience__map-img"
            />
          </div>
        </div>

        {/* Specialty card grid */}
        <nav className="specialty-audience__grid" aria-label="Specialties we help">
          {SPECIALTIES.map(({ slug, label, icon }) => (
            <Link key={slug} to={`/who-we-help/${slug}`} className="specialty-audience__card">
              <span className="specialty-audience__card-icon">{icon}</span>
              <span className="specialty-audience__card-label">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="specialty-audience__footer">
          <Link to="/who-we-help" className="specialty-audience__see-all">
            See all specialties <span aria-hidden="true">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}