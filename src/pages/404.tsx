import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";

import { ROUTES } from "@/constants/routes";

const heading = "Oops! Looks like you hit a dead end!";

const UnknownPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>FEIT Code | 404</title>
        <meta name="description" content={heading} />
      </Helmet>

      <main className="bg-dots grid min-h-dvh place-items-center brightness-50 dark:brightness-100">
        <h1 className="bg-dots fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] scale-[5] bg-clip-text font-mono text-9xl font-extrabold text-transparent opacity-60 lg:scale-[4] md:scale-[2]">
          404
        </h1>

        <div className="grid place-items-center">
          <div className="mb-8 space-y-1 text-center">
            <h2 className="font-serif text-4xl font-bold md:text-2xl">{heading}</h2>
            <p className="text-2xl md:text-xl">Take a deep breath and start over</p>
          </div>

          <Button
            size="lg"
            as={Link}
            // @ts-expect-error NextUI not passing through 'as' props
            to={ROUTES.home}
            color="default"
            variant="bordered"
            className="border-foreground"
          >
            Go back home
          </Button>
        </div>
      </main>
    </Fragment>
  );
};

export default UnknownPage;
