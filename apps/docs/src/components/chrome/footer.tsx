import Image from "next/image";
import { Container } from "./container";
import footerImage from "../../../public/logotype.png";
import { OglLogo } from "../logos/ogl-logo";

export function Footer() {
  return (
    <div className="bg-gold-50 p-x-xl py-3xl border-solid border-t-xs border-gold-500">
      <Container>
        <div className="flex flex-wrap gap-2xl justify-center items-center">
          <div className="flex gap-x-2xl items-center">
            <OglLogo />
            <span>
              All content is available under the{" "}
              <a
                className="underline hover:decoration-4" // TODO: add to theme
                href="#"
                rel="license"
              >
                Open Government Licence v3.0
              </a>
              , except where otherwise stated.
            </span>
          </div>
          <Image
            src={footerImage}
            alt="OGCIO"
            width={190}
            style={{ height: "auto" }}
          />
        </div>
      </Container>
    </div>
  );
}
