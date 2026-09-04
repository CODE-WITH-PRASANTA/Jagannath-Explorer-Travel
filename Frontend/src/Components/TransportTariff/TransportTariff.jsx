import React from 'react';
import './TransportTariff.css';

const tariffData = [
  { vehicle: 'Swift Dzire / Aura / Xcent', hrs10: '2,500', hrs8: '2,200', hrs4: '1,600', extraHr: '120', extraKm: '13' },
  { vehicle: 'Ertiga', hrs10: '3,500', hrs8: '3,000', hrs4: '2,500', extraHr: '150', extraKm: '15' },
  { vehicle: 'Toyota Innova', hrs10: '4,000', hrs8: '3,000', hrs4: '2,800', extraHr: '180', extraKm: '17' },
  { vehicle: 'Toyota Innova Crysta', hrs10: '4,500', hrs8: '4,000', hrs4: '3,500', extraHr: '200', extraKm: '20' },
  { vehicle: 'Honda City / Verna', hrs10: '5,000', hrs8: '4,500', hrs4: '4,000', extraHr: '200', extraKm: '18' },
  { vehicle: '13 Seater Traveller', hrs10: '5,000', hrs8: '4,500', hrs4: '4,000', extraHr: '220', extraKm: '28' },
  { vehicle: '17 Seater Traveller', hrs10: '5,500', hrs8: '5,000', hrs4: '4,500', extraHr: '250', extraKm: '30' },
  { vehicle: '25 Seater Traveller', hrs10: '7,500', hrs8: '7,000', hrs4: '6,500', extraHr: '350', extraKm: '45' },
  { vehicle: '10 Seater Urbania', hrs10: '11,000', hrs8: '10,000', hrs4: '—', extraHr: '500', extraKm: '50' },
  { vehicle: '12 Seater Urbania', hrs10: '12,000', hrs8: '11,000', hrs4: '—', extraHr: '500', extraKm: '60' },
  { vehicle: '17 Seater Urbania', hrs10: '13,000', hrs8: '12,000', hrs4: '—', extraHr: '500', extraKm: '65' },
  { vehicle: '13 SML Coach A/C', hrs10: '9,000', hrs8: '8,000', hrs4: '7,500', extraHr: '500', extraKm: '45' },
  { vehicle: '19 SML Coach A/C', hrs10: '11,000', hrs8: '10,000', hrs4: '9,000', extraHr: '600', extraKm: '55' },
  { vehicle: '22 SML Coach A/C', hrs10: '14,000', hrs8: '13,000', hrs4: '12,000', extraHr: '700', extraKm: '55' },
  { vehicle: '28 SML Coach A/C', hrs10: '18,000', hrs8: '17,000', hrs4: '16,000', extraHr: '800', extraKm: '60' },
  { vehicle: '36 SML Coach A/C', hrs10: '20,000', hrs8: '18,000', hrs4: '17,000', extraHr: '1,000', extraKm: '65' }
];

const termsData = [
  'Toll Tax, Interstate Tax and Parking charges on actual basis.',
  'Kms and Hours will be calculated from the Garage to Garage.',
  'Night Halt Charges from 10 PM - 6 AM ( Light Vehicle- Rs.350, Traveller - Rs.500, Coach - Rs.1000).',
  'Driver Allowance Applicable for Outstation Trip (Light Vehicle - Rs.350, Tempo - Rs.500, Coach - Rs.1000).',
  'A vehicle covering below 300kms in a day shall be billed as per Local Tariff.',
  "For Outstation Duty - Minimum 300 km's charged per Day.",
  'Standing AC is Chargeable.',
  'If a booking is canceled before 24 hrs of the scheduled time then 20% of the total billing will be charged.',
  'While driving on Ghat roads, Air-Conditioning shall remain switched off.',
  'All disputes are subject to Bhubaneswar legal jurisdiction only.',
  <>For <strong>Urbania Tempo traveller in Bhubaneswar</strong>, toll tax, interstate tax, and parking charges will be extra as per actual cost.</>
];

const TransportTariff = () => {
  return (
    <section className="TransportTariff">
      <div className="TransportTariff-container">
        {/* Header Titles */}
        <div className="TransportTariff-header">
          <span className="TransportTariff-tagline">Rates &amp; Charges</span>
          <h1 className="TransportTariff-title">Transport Tariff</h1>
        </div>

        {/* Card & Table wrapper */}
        <div className="TransportTariff-card">
          <div className="TransportTariff-banner">
            FOR LOCAL &amp; OUTSTATION (300 Km Per Day)
          </div>

          <div className="TransportTariff-tableResponsive">
            <table className="TransportTariff-table">
              <thead>
                <tr>
                  <th className="TransportTariff-colVehicle">Vehicle A/C</th>
                  <th>10 Hrs./100 Km (Rs.)</th>
                  <th>8 Hrs./80 Km (Rs.)</th>
                  <th>4 Hrs./40 Km (Rs.)</th>
                  <th>Extra Hrs. (Rs.)</th>
                  <th>Extra Km (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {tariffData.map((row, index) => (
                  <tr key={index} className="TransportTariff-row">
                    <td className="TransportTariff-cellVehicle">{row.vehicle}</td>
                    <td className="TransportTariff-cell">{row.hrs10}</td>
                    <td className="TransportTariff-cell">{row.hrs8}</td>
                    <td className="TransportTariff-cell">{row.hrs4}</td>
                    <td className="TransportTariff-cell">{row.extraHr}</td>
                    <td className="TransportTariff-cell">{row.extraKm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Terms & Conditions Section */}
        <div className="TransportTariff-termsSection">
          <h2 className="TransportTariff-termsTitle">Terms &amp; Conditions</h2>
          <ul className="TransportTariff-termsList">
            {termsData.map((term, index) => (
              <li key={index} className="TransportTariff-termsItem">
                <span className="TransportTariff-checkIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </span>
                <span className="TransportTariff-termsText">{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TransportTariff;