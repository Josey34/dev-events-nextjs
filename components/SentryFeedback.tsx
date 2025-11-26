"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function SentryFeedback() {
  useEffect(() => {
    const feedback = Sentry.getFeedback();

    if (!feedback) {
      const feedbackIntegration = Sentry.feedbackIntegration({
        colorScheme: "system",
        autoInject: true,
        showBranding: false,
        buttonLabel: "Report a Bug",
        submitButtonLabel: "Submit Feedback",
        formTitle: "Send your feedback",
        triggerLabel: "Report a Bug",
        themeLight: {
          submitBackground: "#5dfeca",
          submitBackgroundHover: "#4dcfba",
        },
        themeDark: {
          submitBackground: "#5dfeca",
          submitBackgroundHover: "#4dcfba",
        },
      });

      Sentry.getClient()?.addIntegration(feedbackIntegration);
    }

    return () => {
    };
  }, []);

  return null;
}
