import React from "react";
import LegalPage from "views/Legal";
import { useRouter } from "next/router";

const Legal = () => {
  const {
    query: { pid },
  } = useRouter();

  return <LegalPage policy={pid as string} />;
};

export default Legal;
