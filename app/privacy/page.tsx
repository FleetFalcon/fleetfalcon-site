{/* DRAFT incorporating internal counsel review — have retained counsel review before publishing. */}
import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList, LegalMail } from "../components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FleetFalcon Corp collects, uses, and protects personal data in its DOT/FMCSA fleet-compliance platform.",
  alternates: { canonical: "/privacy" },
};

const mailClass = "text-accent underline hover:no-underline";

function PrivacyMail() {
  return (
    <a href="mailto:privacy@fleetfalcon.io" className={mailClass}>
      privacy@fleetfalcon.io
    </a>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 3, 2026"
      intro={
        <>
          FleetFalcon Corp (&quot;FleetFalcon&quot;, &quot;we&quot;, &quot;our&quot;, or
          &quot;us&quot;) provides a DOT/FMCSA fleet safety and compliance platform to motor carriers
          and related organizations. This Privacy Policy explains how we collect, use, disclose, and
          protect personal data in connection with our website at fleetfalcon.io (the &quot;Site&quot;)
          and our software services (the &quot;Services&quot;). It is important to understand that
          much of the data in our Services is uploaded by our business customers about their drivers
          and other third parties; for that data we act as a processor on the customer&apos;s behalf,
          as described in Section 1.
        </>
      }
    >
      <LegalSection heading="1. Our Role: Controller vs. Processor">
        <p>
          FleetFalcon serves two distinct roles depending on the data at issue.
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">As a processor / service provider.</strong>{" "}
              When a motor carrier or other organization (the &quot;Customer&quot;) uses the Services
              to manage its compliance program, the Customer is the controller (or, under U.S. state
              law, the &quot;business&quot;) that determines why and how the data is processed.
              FleetFalcon processes that data only to provide the Services and only on the Customer&apos;s
              documented instructions, as a processor (or &quot;service provider&quot;). Where a data
              processing addendum has been signed with a Customer, it governs our handling of that
              data and prevails over this Policy.
            </>,
            <>
              <strong className="font-semibold text-foreground">As a controller.</strong> For a limited
              set of data — such as the account and contact details of the people who register and
              administer a Customer account, billing information, and Site analytics — we act as a
              controller and determine the purposes and means of processing. This Policy describes
              that processing directly.
            </>,
          ]}
        />
        <p>
          Where we act as a processor, this Policy is informational and the Customer&apos;s own privacy
          notices control. If there is a conflict between this Policy and a signed data processing
          addendum or master agreement with a Customer, that agreement governs for the data processed
          under it.
        </p>
      </LegalSection>

      <LegalSection heading="2. Whose Data We Process">
        <p>We process personal data about several categories of individuals:</p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">Account users.</strong> The
              administrators, safety managers, and other personnel of a Customer who register for and
              use the Services (&quot;Authorized Users&quot;).
            </>,
            <>
              <strong className="font-semibold text-foreground">Drivers and other third parties.</strong>{" "}
              Commercial drivers, driver applicants, and other individuals whose records a Customer
              uploads to or generates within the Services. These individuals generally do not have a
              direct relationship with FleetFalcon; we hold their data on the Customer&apos;s behalf,
              and the Customer is responsible for providing them with any required notices and for
              having a lawful basis to share their data with us.
            </>,
            <>
              <strong className="font-semibold text-foreground">Site visitors.</strong> People who
              visit fleetfalcon.io or contact us.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="3. Information We Collect">
        <p>
          Depending on the role and the Services in use, we may collect or process the following
          categories of data. Much of this is submitted by the Customer about its drivers and
          applicants, not collected directly from the individual:
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">Account &amp; contact data:</strong>{" "}
              name, business email, phone, role, and company details of Authorized Users.
            </>,
            <>
              <strong className="font-semibold text-foreground">Authentication data:</strong>{" "}
              email/password credentials or Google OAuth identifiers.
            </>,
            <>
              <strong className="font-semibold text-foreground">Billing data:</strong> subscription
              tier, plan size, and payment information processed through Stripe (we do not store full
              card numbers).
            </>,
            <>
              <strong className="font-semibold text-foreground">Driver qualification (DQ) file data:</strong>{" "}
              commercial driver&apos;s licenses (CDLs), medical examiner&apos;s certificates and
              national registry data, motor vehicle records (MVRs), employment and road-test records,
              and related expiry/renewal tracking (DocPulse).
            </>,
            <>
              <strong className="font-semibold text-foreground">Onboarding &amp; screening data:</strong>{" "}
              background-check reports, Pre-Employment Screening Program (PSP) reports, and MVR pulls
              obtained during Rapid Onboarding.
            </>,
            <>
              <strong className="font-semibold text-foreground">Safety &amp; compliance data:</strong>{" "}
              roadside-inspection records, violations and CSA/SMS data (Violation Radar), including data
              from a carrier-authorized pull of the Customer&apos;s own FMCSA SMS/portal account;
              incident and accident records; and driver citations (Citation Watch).
            </>,
            <>
              <strong className="font-semibold text-foreground">Sensitive identifiers:</strong> Social
              Security numbers and similar government identifiers, where provided by the Customer for
              compliance purposes.
            </>,
            <>
              <strong className="font-semibold text-foreground">Drug &amp; alcohol testing data:</strong>{" "}
              testing records and related program data subject to 49 CFR Part 40, and, where applicable,
              FMCSA Drug and Alcohol Clearinghouse data (see Section 5).
            </>,
            <>
              <strong className="font-semibold text-foreground">English Language Proficiency (ELP) data:</strong>{" "}
              ELP assessment records and results, including voice recordings where the assessment is
              recorded.
            </>,
            <>
              <strong className="font-semibold text-foreground">Usage &amp; device data:</strong> log
              data, device/browser information, and Site analytics collected through Google Analytics.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="4. How We Collect It">
        <LegalList
          items={[
            "Directly from Authorized Users during account creation (sign-up forms or Google authentication) and ongoing use.",
            "From the Customer, through data and document uploads about its drivers and applicants.",
            "From third-party sources at the Customer's direction — e.g., MVR/PSP/background providers, and a carrier-authorized pull of the Customer's own FMCSA SMS/portal data.",
            "Automatically, through cookies and analytics tools when you use the Site.",
            "From Stripe in connection with billing.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="5. Sensitive Data & Sector-Specific Laws">
        <p>
          Some of the data we process is highly sensitive and governed by specific federal laws. We
          apply heightened handling to this data, and we process it only to provide the Services on the
          Customer&apos;s instructions. The Customer, as controller, remains responsible for the lawful
          basis, consents, and permissible purposes required by these regimes:
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">Drug &amp; alcohol testing records (49 CFR Part 40).</strong>{" "}
              These records are confidential under Part 40 and are released only as that regulation
              permits. We treat them as confidential and restrict access accordingly.
            </>,
            <>
              <strong className="font-semibold text-foreground">Motor vehicle records (DPPA, 18 U.S.C. §2721).</strong>{" "}
              MVR data is protected by the Driver&apos;s Privacy Protection Act and may be used and
              disclosed only for permissible purposes. The Customer warrants it has a permissible
              purpose for each MVR obtained through the Services.
            </>,
            <>
              <strong className="font-semibold text-foreground">Background &amp; PSP reports (FCRA).</strong>{" "}
              Where background or PSP reports are used in hiring or other eligibility decisions, the Fair
              Credit Reporting Act imposes disclosure, authorization, and adverse-action obligations on
              the Customer. FleetFalcon is not a consumer reporting agency and does not assume the
              Customer&apos;s FCRA duties.
            </>,
            <>
              <strong className="font-semibold text-foreground">FMCSA Drug &amp; Alcohol Clearinghouse.</strong>{" "}
              Clearinghouse data is subject to statutory consent and limited-use restrictions. Where the
              Services touch Clearinghouse data, it is processed only pursuant to the specific driver
              consent and the limited uses the law permits, and only on the Customer&apos;s instructions.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="6. How We Use Data">
        <LegalList
          items={[
            "Provide, maintain, secure, and improve the Services.",
            "Process and analyze compliance data to deliver document and expiry tracking, onboarding, inspection and CSA monitoring, citation tracking, ELP records, and related features.",
            "Authenticate users and administer accounts.",
            "Process billing and subscriptions through Stripe.",
            "Communicate service, security, and account updates.",
            "Comply with legal obligations and enforce our agreements.",
          ]}
        />
        <p>
          We use data processed on a Customer&apos;s behalf only to provide the Services to that
          Customer and as its DPA permits. We do not use it for our own independent purposes, and we do
          not sell it.
        </p>
      </LegalSection>

      <LegalSection heading="7. Automated Processing & AI">
        <p>
          The Services use automated processing, including artificial intelligence and large language
          models, to analyze compliance documents and data — for example, to extract fields from
          uploaded documents, parse roadside inspections, flag expiring credentials, and summarize CSA
          and violation data. These outputs are decision-support tools and may contain errors; they do
          not replace a qualified human review.
        </p>
        <p>
          <strong className="font-semibold text-foreground">
            We do not train AI models on customer or driver data.
          </strong>{" "}
          Customer Data and driver data are not used to train, fine-tune, or improve any FleetFalcon or
          third-party foundation model. Where we use a third-party AI/LLM provider to process data, we
          do so under terms that likewise prohibit training on the data and require its confidential
          handling.
        </p>
      </LegalSection>

      <LegalSection heading="8. How We Share Data; Sub-processors">
        <p>
          We do not sell personal data. We share data only with service providers (sub-processors) that
          help us deliver the Services, under contracts that limit their use of the data to that
          purpose. Our current sub-processors include:
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">Stripe</strong> — payment and
              subscription processing.
            </>,
            <>
              <strong className="font-semibold text-foreground">Google</strong> — OAuth authentication
              and Google Analytics.
            </>,
            <>
              <strong className="font-semibold text-foreground">Railway</strong> — backend hosting and
              data storage.
            </>,
            <>
              <strong className="font-semibold text-foreground">Vercel</strong> — frontend hosting.
            </>,
            <>
              <strong className="font-semibold text-foreground">AI/LLM provider(s)</strong> — automated
              analysis of compliance data, under no-training terms (Section 7).
            </>,
          ]}
        />
        <p>
          We maintain a current list of sub-processors and will provide notice of material changes to
          Customers as required by any signed data processing addendum. We may also disclose data to comply with law, respond to
          lawful requests, or protect the rights, safety, and security of FleetFalcon, our Customers, or
          the public, and in connection with a merger, acquisition, or sale of assets (subject to this
          Policy).
        </p>
      </LegalSection>

      <LegalSection heading="9. Do Not Sell or Share; Cookies & Analytics">
        <p>
          FleetFalcon does not sell personal data and does not &quot;share&quot; it for cross-context
          behavioral advertising, as those terms are defined under the California Consumer Privacy Act
          as amended by the CPRA.
        </p>
        <p>
          The Site uses cookies and similar technologies, including Google Analytics, to understand how
          the Site is used. You can control cookies through your browser settings. Analytics data is
          used to operate and improve the Site, not to build advertising profiles.
        </p>
      </LegalSection>

      <LegalSection heading="10. Data Retention">
        <p>
          We retain personal data for as long as needed to provide the Services and as required by the
          Customer&apos;s instructions and applicable law. Importantly, much of the compliance data in
          the Services is subject to mandatory federal retention periods, and deletion is subject to
          those obligations — this is not a &quot;delete anytime&quot; product. Examples include:
        </p>
        <LegalList
          items={[
            "Driver qualification (DQ) files — retained for the period of employment plus three years after termination (49 CFR 391.51).",
            "Drug and alcohol testing records — retained for the periods specified in 49 CFR Part 40 and Part 382.",
            "Accident register and related records — retained for three years (49 CFR 390.15).",
          ]}
        />
        <p>
          When a Customer deletes records or terminates its subscription, we delete or return Customer
          Data in accordance with the DPA, except where we are required to retain it to meet the
          Customer&apos;s or our own legal obligations, resolve disputes, or enforce agreements. Data we
          process as a controller (such as account and billing records) is retained as needed for those
          purposes and applicable legal requirements.
        </p>
      </LegalSection>

      <LegalSection heading="11. Data Security">
        <p>
          We maintain administrative, technical, and organizational safeguards designed to protect
          personal data, including encryption in transit and at rest and role-based access controls.
          No system is perfectly secure, but we work to protect data consistent with its sensitivity
          and applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="12. Breach Notification">
        <p>
          Where we act as a processor and become aware of a personal-data breach affecting Customer
          Data, we will notify the affected Customer (the controller) without undue delay and provide
          the information reasonably needed for the Customer to meet its own notification obligations, as
          set out in the DPA. Where we act as a controller, we will provide any legally required
          notifications directly.
        </p>
      </LegalSection>

      <LegalSection heading="13. How Drivers & Other Third Parties Exercise Rights">
        <p>
          If you are a driver, applicant, or other individual whose data a Customer has uploaded, your
          relationship is with that Customer, which controls the data. Please direct access, correction,
          or deletion requests to the Customer (your employer or prospective employer). If you contact us
          directly, we will, where appropriate, refer your request to the relevant Customer and support
          the Customer in responding, consistent with any signed data processing addendum and applicable law. We generally cannot
          delete or alter a driver&apos;s compliance records without the controlling Customer&apos;s
          instruction, and some records are subject to the mandatory retention periods in Section 10.
        </p>
      </LegalSection>

      <LegalSection heading="14. Your Privacy Rights">
        <p>
          Depending on where you live and our role, you may have rights regarding your personal data.
        </p>
        <LegalList
          items={[
            <>
              <strong className="font-semibold text-foreground">California (CCPA/CPRA).</strong>{" "}
              California residents may have the right to know, access, correct, and delete personal
              information, to opt out of sale/sharing (we do not sell or share), to limit use of
              sensitive personal information, and to be free from discrimination for exercising these
              rights.
            </>,
            <>
              <strong className="font-semibold text-foreground">EU/EEA/UK (GDPR), where applicable.</strong>{" "}
              If we process personal data subject to the GDPR, data subjects may have rights of access,
              rectification, erasure, restriction, portability, and objection, and may lodge a complaint
              with a supervisory authority. Where we act as a processor, we will forward such requests to
              the relevant controller.
            </>,
            <>
              <strong className="font-semibold text-foreground">Other U.S. states.</strong> Residents of
              states with comprehensive privacy laws may have similar rights.
            </>,
          ]}
        />
        <p>
          To exercise rights as to data for which we are the controller, contact us at <PrivacyMail />.
          For data a Customer uploaded, see Section 13.
        </p>
      </LegalSection>

      <LegalSection heading="15. A Business Product">
        <p>
          FleetFalcon is a business-to-business compliance platform intended for motor carriers and
          their authorized personnel. The Services and Site are not directed to consumers or to
          children, and we do not knowingly collect personal information directly from children. Driver
          records processed in the Services relate to commercial drivers in an employment context, not to
          consumer or child users.
        </p>
      </LegalSection>

      <LegalSection heading="16. International Data Transfers">
        <p>
          We operate primarily in the United States, and our hosting providers store data in the United
          States. If you access the Services from outside the United States, you understand that your
          data may be processed in the United States. Where required, we rely on appropriate transfer
          mechanisms for cross-border transfers of data subject to the GDPR or similar laws.
        </p>
      </LegalSection>

      <LegalSection heading="17. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be posted on this
          page with an updated &quot;Last updated&quot; date and, where required, communicated to
          Customers.
        </p>
      </LegalSection>

      <LegalSection heading="18. Contact Us">
        <p>
          For privacy questions or requests, contact our privacy team at <PrivacyMail />. You may also
          reach us at <LegalMail />.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
