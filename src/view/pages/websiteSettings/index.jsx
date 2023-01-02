import ContactList from "./Contacts";
import SocialMedia from "./SocialMedia";
import FAQ from "./FAQ";
import TermConditions from "./TermConditions";
import PrivacyPolicies from "./PrivacyPolicies";

export default function () {
  return (
    <>
      <ContactList />
      <br />
      <SocialMedia />
      <br />
      <FAQ />
      <br />
      <TermConditions />
      <br />
      <PrivacyPolicies />
      <br />
    </>
  );
}
