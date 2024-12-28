import { PropsWithChildren, useMemo } from "react";

import clsx from "clsx";

import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage } from "@/constants/enums";

type Props = {
  title: string;
  output: string;

  studentEmail: string;
  language: ProgrammingLanguage;

  loading?: boolean;
} & PropsWithChildren;

const ExamTaskOutput = ({ title, output, studentEmail, language, loading = false, children }: Props) => {
  const emailSlug = useMemo(() => studentEmail.split("@")[0], [studentEmail]);
  const titleSlug = useMemo(() => title.replace(/ /g, "_"), [title]);

  const runCommand = useMemo(() => LANGUAGES_CONFIG[language].commandExec(titleSlug), [language, titleSlug]);

  return (
    <div className="relative flex h-full flex-col justify-between pt-5 font-mono text-white">
      <div className="space-y-2 pb-4">
        <div
          className={clsx("space-x-1.5 font-semibold text-success", {
            "pointer-events-none opacity-90": loading,
          })}
        >
          <span>
            {emailSlug}@{titleSlug}
          </span>

          <Icon name="right" className={clsx("inline h-4 w-4", { "animate-blink": loading })} />

          {(loading || !!output) && (
            <span className={clsx("text-foreground", { "animate-blink": loading })}>{runCommand}</span>
          )}
        </div>

        <PresenceBlock show={!!output}>
          <p className="whitespace-pre-line break-words leading-normal">{output}</p>
        </PresenceBlock>
      </div>

      {children}
    </div>
  );
};

export default ExamTaskOutput;
