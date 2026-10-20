{/* DRAFT incorporating internal counsel review — have retained counsel review before publishing. */}
import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, LegalMail } from "../components/legal";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms governing use of FleetFalcon Corp's DOT/FMCSA fleet-compliance website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and Conditions"
      updated="October 3, 2026"
      intro={
        <>
          These Terms and Conditions (&quot;Terms&quot;) govern access to and use of the website at
          fleetfalcon.io (the &quot;Site&quot;) and the DOT/FMCSA fleet safety and compliance software
          services (the &quot;Services&quot;) provided by FleetFalcon Corp (&quot;FleetFalcon&quot;,
          &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing or using the Services, you
          agree to be bound by these Terms. If you are entering into these Terms on behalf of an
          organization, you represent that you have authority to bind that organization. If you do not
          agree, do not use the Site or the Services.
        </>
      }
    >
      <LegalSection heading="1. Definitions">
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">&quot;Customer&quot; or &quot;Carrier&quot;</strong>{" "}
              means the motor carrier or other organization that subscribes to the Services and on whose
              behalf data is processed.
            </>,
            <>
              <strong className="font-semibold text-foreground">&quot;Authorized User&quot;</strong> means
              an individual the Customer permits to access the Services (e.g., safety managers,
              administrators).
            </>,
            <>
              <strong className="font-semibold text-foreground">&quot;Driver&quot; or &quot;End Data Subject&quot;</strong>{" "}
              means a driver, applicant, or other individual whose records the Customer uploads to or
              generates within the Services.
            </>,
            <>
              <strong className="font-semibold text-foreground">&quot;Customer Data&quot;</strong> means
              all data, documents, and records the Customer or its Authorized Users submit to, or that
              are collected on the Customer&apos;s behalf through, the Services.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="2. The Services">
        <p>
          The Services help Customers manage fleet safety and compliance, including driver qualification
          (DQ) files, document and expiry tracking (DocPulse), driver onboarding (Rapid Onboarding),
          roadside-inspection and CSA monitoring (Violation Radar), incident records, citation tracking
          (Citation Watch), and English Language Proficiency (ELP) records. The Customer may use the
          Services only for its lawful internal compliance purposes and is responsible for all Customer
          Data and all activity under its account.
        </p>
      </LegalSection>

      <LegalSection heading="3. Account Registration & Authorized Users">
        <p>
          To use the Services, the Customer must create an account using an email/password or Google
          OAuth. The Customer is responsible for maintaining the confidentiality of credentials, for its
          Authorized Users&apos; compliance with these Terms, and for all activity under its account.
        </p>
      </LegalSection>

      <LegalSection heading="4. Compliance Tool, Not a Guarantor">
        <p>
          FleetFalcon is a recordkeeping and decision-support tool. It does not assume, and the Customer
          retains sole and non-delegable responsibility for, compliance with the Federal Motor Carrier
          Safety Regulations, DOT requirements, and all other applicable laws. FleetFalcon does not
          guarantee any outcome — including the completeness or correctness of records, the result of any
          audit, investigation, or enforcement action, any safety-fitness or SMS/CSA rating, or any
          insurance or underwriting result. The Customer is responsible for independently reviewing and
          verifying its compliance and for all decisions it makes using the Services.
        </p>
      </LegalSection>

      <LegalSection heading="5. No Legal Advice">
        <p>
          The Services, including any flags, scores, summaries, alerts, and AI-generated output, are
          informational only and do not constitute legal, regulatory, or professional advice. Use of the
          Services does not create an attorney-client relationship. The Customer should consult qualified
          counsel and its own compliance professionals regarding its obligations.
        </p>
      </LegalSection>

      <LegalSection heading="6. Customer Responsibilities & Representations">
        <p>The Customer represents, warrants, and covenants that:</p>
        <LegalList
          items={[
            "It is the controller (or business) with respect to Customer Data and determines the purposes and means of its processing.",
            "It has all necessary rights, authority, notices, and consents to upload Driver and other third-party data to the Services and to have FleetFalcon process it, and will provide any privacy notices required to those individuals.",
            "It is authorized to direct and authorize the data pulls performed through the Services, including FMCSA/Violation Radar pulls, MVRs, PSP, and background checks.",
            "It will perform its own obligations under the Fair Credit Reporting Act (FCRA), including any required disclosures, authorizations, and adverse-action procedures.",
            "Its use of the Services and Customer Data complies with all applicable laws.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="7. Authorized Access to FMCSA Systems (Violation Radar)">
        <p>
          Violation Radar may retrieve the Customer&apos;s own roadside-inspection, violation, and
          CSA/SMS data from FMCSA systems and portals. With respect to this feature, the Customer:
        </p>
        <LegalList
          items={[
            "Represents that it is the carrier (or its authorized representative) entitled to access its own USDOT/FMCSA SMS and portal data, and appoints FleetFalcon as its agent to access that data on its behalf;",
            "Covenants to comply with all FMCSA system terms of use and not to circumvent or attempt to circumvent any authentication or access controls; and",
            "Acknowledges that FMCSA data may be incomplete, inaccurate, or point-in-time, that FleetFalcon does not control it, and that corrections and disputes must be pursued through FMCSA's DataQs process, which is outside FleetFalcon's control.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="8. Background & Screening Data (PSP / MVR / FCRA / DPPA)">
        <p>
          Where the Services obtain or display background-check reports, Pre-Employment Screening Program
          (PSP) reports, or motor vehicle records (MVRs), the Customer warrants that it has a permissible
          purpose for each such report under applicable law, including the FCRA and the Driver&apos;s
          Privacy Protection Act (DPPA, 18 U.S.C. §2721).{" "}
          <strong className="font-semibold text-foreground">
            FleetFalcon is not a consumer reporting agency
          </strong>{" "}
          and does not furnish consumer reports; it facilitates the Customer&apos;s access to data the
          Customer is independently authorized to obtain. The Customer will use such data only for
          permissible purposes and in compliance with those laws.
        </p>
      </LegalSection>

      <LegalSection heading="9. Drug & Alcohol / Clearinghouse">
        <p>
          Drug and alcohol testing records are confidential under 49 CFR Part 40 and 49 CFR Part 382, and
          FMCSA Drug and Alcohol Clearinghouse data is subject to statutory consent and limited-use
          restrictions. To the extent the Customer uses the Services to store or manage such records,
          processing is gated to the specific driver consent and the limited uses the law permits, and
          the Customer is responsible for maintaining those consents.{" "}
          <strong className="font-semibold text-foreground">
            FleetFalcon does not query or process FMCSA Clearinghouse data unless and until a separate
            Clearinghouse-specific addendum is executed between the parties.
          </strong>
        </p>
      </LegalSection>

      <LegalSection heading="10. English Language Proficiency (ELP)">
        <p>
          The ELP feature provides a self-assessment record of a driver&apos;s English language
          proficiency. It is a recordkeeping tool only. FleetFalcon does not make, and is not responsible
          for, any qualification, disqualification, or out-of-service determination, which remains the
          responsibility of the Customer and the applicable enforcement authorities.
        </p>
      </LegalSection>

      <LegalSection heading="11. Customer Data; Ownership & License">
        <p>
          As between the parties, the Customer owns and retains all rights in Customer Data. The Customer
          grants FleetFalcon a limited, non-exclusive license to host, store, process, transmit, and
          analyze Customer Data solely to provide, secure, and support the Services and as its Data
          Processing Addendum permits. FleetFalcon does not sell Customer Data.
        </p>
      </LegalSection>

      <LegalSection heading="12. Artificial Intelligence">
        <p>
          The Services use automated processing, including AI and large language models, to analyze
          compliance data. The Customer grants FleetFalcon the license needed to process Customer Data for
          this purpose.{" "}
          <strong className="font-semibold text-foreground">
            FleetFalcon does not train AI models on Customer Data or Driver data,
          </strong>{" "}
          and uses any third-party AI/LLM provider under terms that prohibit such training. AI output is
          decision-support only, may contain errors, and does not constitute compliance or legal advice.
        </p>
      </LegalSection>

      <LegalSection heading="13. Record Retention & Deletion; Export on Termination">
        <p>
          The Customer is the custodian of record for its compliance records. Because much of the data in
          the Services is subject to mandatory federal retention periods — for example, DQ files for the
          period of employment plus three years (49 CFR 391.51), drug and alcohol records per 49 CFR Part
          40, and the accident register for three years (49 CFR 390.15) — deletion is retention-aware and
          FleetFalcon may decline to delete records where retention is legally required. Upon termination,
          and before deletion, FleetFalcon will make available an export of Customer Data in a commercially
          reasonable format, after which it will delete or return Customer Data in accordance with the DPA
          and applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="14. Data Processing Addendum">
        <p>
          FleetFalcon acts as a processor / service provider with respect to Customer Data. Our Data
          Processing Addendum (&quot;DPA&quot;) is incorporated into these Terms by reference and governs
          that processing, including GDPR Article 28 and CCPA service-provider terms, the use of
          sub-processors, breach notification, and the deletion or return of Customer Data on termination.
        </p>
      </LegalSection>

      <LegalSection heading="15. Fees, Subscription & Free Trial">
        <p>
          The Services are offered on a subscription basis, with a flat monthly fee determined by fleet
          size, billed through Stripe. English Language Proficiency testing is offered as a separate
          pay-per-test product at the then-current per-test price. New subscriptions may include a 30-day
          free trial; unless cancelled before the trial ends, the subscription converts to a paid plan at
          the applicable rate. Subscriptions auto-renew for successive periods until cancelled. The
          Customer may cancel as described in the Services or by contacting us; except as required by law,
          fees already paid are non-refundable. By providing payment information, the Customer authorizes
          FleetFalcon and Stripe to charge the applicable fees and taxes.
        </p>
      </LegalSection>

      <LegalSection heading="16. Acceptable Use">
        <p>The Customer and its Authorized Users agree not to:</p>
        <LegalList
          items={[
            "Violate any laws or regulations, or upload data they lack the right or consent to upload;",
            "Upload harmful, unlawful, or misleading content, or malware;",
            "Reverse engineer, decompile, or attempt to extract the source code of the Services;",
            "Circumvent access controls, including those of FMCSA or other third-party systems; or",
            "Interfere with or disrupt the Services, servers, or networks.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="17. Intellectual Property">
        <p>
          All content, branding, and software comprising the Site and Services (excluding Customer Data)
          are owned by FleetFalcon or its licensors and are protected by intellectual property laws. No
          rights are granted except the limited right to use the Services under these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="18. Disclaimer of Warranties">
        <p>
          The Services are provided &quot;as is&quot; and &quot;as available,&quot; without warranties of
          any kind, whether express, implied, or statutory, including implied warranties of
          merchantability, fitness for a particular purpose, and non-infringement. FleetFalcon does not
          warrant the accuracy, completeness, or usefulness of any platform content, third-party data
          (including FMCSA, MVR, PSP, and background data), or AI-generated output, and makes no guarantee
          regarding any audit, enforcement, safety-fitness, insurance, or underwriting outcome.
        </p>
      </LegalSection>

      <LegalSection heading="19. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, FleetFalcon and its affiliates will not be liable for
          any indirect, incidental, special, consequential, or punitive damages, or for lost profits,
          revenue, data, or goodwill, arising out of or related to the Services. FleetFalcon&apos;s total
          aggregate liability arising out of or related to these Terms will not exceed the fees paid by
          the Customer to FleetFalcon in the twelve months preceding the event giving rise to the
          liability.
        </p>
      </LegalSection>

      <LegalSection heading="20. Indemnification">
        <p>
          The Customer will defend, indemnify, and hold harmless FleetFalcon and its affiliates from and
          against any claims, damages, liabilities, and expenses (including reasonable attorneys&apos;
          fees) arising out of or related to: (a) Customer Data or the Customer&apos;s upload of data it
          lacked the right or consent to upload; (b) the Customer&apos;s unauthorized or unlawful direction
          of FMCSA, MVR, PSP, background, or other data pulls; or (c) the Customer&apos;s violation of
          these Terms or applicable law, including the FCRA, DPPA, and 49 CFR.
        </p>
      </LegalSection>

      <LegalSection heading="21. Termination">
        <p>
          Either party may terminate as provided in the applicable order or subscription. FleetFalcon may
          suspend or terminate access for violations of these Terms or where use poses a security or legal
          risk. On termination, the export and deletion provisions of Section 13 apply.
        </p>
      </LegalSection>

      <LegalSection heading="22. Governing Law, Venue & Dispute Resolution">
        <p>
          These Terms are governed by the laws of{" "}
          <strong className="font-semibold text-foreground">
            [Governing-law state — confirm with counsel]
          </strong>
          , without regard to its conflict-of-laws rules. The parties submit to the exclusive jurisdiction
          and venue of the state and federal courts located in that state for any dispute arising out of
          or related to these Terms, except that either party may seek injunctive relief in any court of
          competent jurisdiction. The parties will attempt in good faith to resolve any dispute informally
          before initiating proceedings.
        </p>
      </LegalSection>

      <LegalSection heading="23. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Material changes will be posted on this page with an
          updated &quot;Last updated&quot; date. Continued use of the Services after changes take effect
          constitutes acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection heading="24. Contact">
        <p>
          If you have questions about these Terms, contact us at <LegalMail />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
