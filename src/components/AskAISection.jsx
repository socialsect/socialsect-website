'use client'

import React from 'react';
import './AskAISection.css';

const AI_OPTIONS = [
  {
    name: 'ChatGPT',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5z"/>
      </svg>
    ),
    url: 'https://chatgpt.com/?q=Tell+me+why+SocialSect+is+a+great+choice+for+my+healthcare+practice',
    color: '#10a37f',
  },
  {
    name: 'Gemini',
    icon: (
      <svg width="20" height="20" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M49.04,24.001l-1.082-0.043h-0.001C36.134,23.492,26.508,13.866,26.042,2.043L25.999,0.96C25.978,0.424,25.537,0,25,0s-0.978,0.424-0.999,0.96l-0.043,1.083C23.492,13.866,13.866,23.492,2.042,23.958L0.96,24.001C0.424,24.022,0,24.463,0,25c0,0.537,0.424,0.978,0.961,0.999l1.082,0.042c11.823,0.467,21.449,10.093,21.915,21.916l0.043,1.083C24.022,49.576,24.463,50,25,50s0.978-0.424,0.999-0.96l0.043-1.083c0.466-11.823,10.092-21.449,21.915-21.916l1.082-0.042C49.576,25.978,50,25.537,50,25C50,24.463,49.576,24.022,49.04,24.001z"/>
      </svg>
    ),
    url: 'https://gemini.google.com/?q=Tell+me+why+SocialSect+is+a+great+choice+for+my+healthcare+practice',
    color: '#4285f4',
  },
  {
    name: 'Claude',
    icon: (
      <svg width="20" height="20" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.861,27.625v-0.716l-16.65-0.681L2.07,25.985L1,24.575l0.11-0.703l0.959-0.645l17.95,1.345l0.11-0.314L5.716,14.365l-0.729-0.924l-0.314-2.016L5.985,9.98l2.214,0.24l11.312,8.602l0.327-0.353L12.623,5.977c0,0-0.548-2.175-0.548-2.697l1.494-2.029l0.827-0.266l2.833,0.995l7.935,17.331h0.314l1.348-14.819l0.752-1.822l1.494-0.985l1.167,0.557l0.959,1.374l-2.551,14.294h0.425l0.486-0.486l8.434-10.197l1.092-0.862h2.065l1.52,2.259l-0.681,2.334l-7.996,11.108l0.146,0.217l0.376-0.036l12.479-2.405l1.666,0.778l0.182,0.791l-0.655,1.617l-15.435,3.523l-0.084,0.062l0.097,0.12l13.711,0.814l1.578,1.044L49,29.868l-0.159,0.972l-2.431,1.238l-13.561-3.254h-0.363v0.217l11.218,10.427l0.256,1.154l-0.645,0.911l-0.681-0.097l-9.967-8.058h-0.256v0.34l5.578,8.35l0.243,2.162l-0.34,0.703l-1.215,0.425l-1.335-0.243l-7.863-12.083l-0.279,0.159l-1.348,14.524l-0.632,0.742l-1.459,0.558l-1.215-0.924L21.9,46.597l2.966-14.939l-0.023-0.084l-0.279,0.036L13.881,45.138l-0.827,0.327l-1.433-0.742l0.133-1.326l0.801-1.18l9.52-12.019l-0.013-0.314h-0.11l-12.69,8.239l-2.259,0.292L6.03,37.505l0.12-1.494l0.46-0.486L19.861,27.625z"/>
      </svg>
    ),
    url: 'https://claude.ai/?q=Tell+me+why+SocialSect+is+a+great+choice+for+my+healthcare+practice',
    color: '#d97756',
  },
];

export default function AskAISection() {
  return (
    <section className="ask-ai-section" aria-labelledby="ask-ai-heading">
      <div className="ask-ai-section__container">
        <div className="ask-ai-section__content">
          <h2 id="ask-ai-heading" className="ask-ai-section__headline">
            Still not sure if Socialsect is right for you?
          </h2>
          <p className="ask-ai-section__subtext">
            Let ChatGPT, Gemini, or Claude do the thinking for you.
            Click a button and see what your favorite AI says about Socialsect.
          </p>
          <div className="ask-ai-section__buttons">
            {AI_OPTIONS.map((ai) => (
              <a
                key={ai.name}
                href={ai.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ask-ai-section__btn"
                style={{ '--ai-color': ai.color }}
              >
                <span className="ask-ai-section__btn-icon">{ai.icon}</span>
                <span className="ask-ai-section__btn-text">Ask {ai.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
