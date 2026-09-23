"use client";

import {useTheme} from "next-themes";
import {Toaster as Sonner} from "sonner";
import {Check, CircleAlert, Info, Loader2, X} from "lucide-react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({...props}: ToasterProps) => {
  const {resolvedTheme} = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme ?? "dark") as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      closeButton
      expand
      visibleToasts={3}
      gap={10}
      offset={{top: "4.75rem", right: "1.25rem"}}
      duration={4200}
      icons={{
        success: <Check className="h-3.5 w-3.5" strokeWidth={2} />,
        error: <CircleAlert className="h-3.5 w-3.5" strokeWidth={2} />,
        info: <Info className="h-3.5 w-3.5" strokeWidth={2} />,
        warning: <CircleAlert className="h-3.5 w-3.5" strokeWidth={2} />,
        loading: (
          <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
        ),
        close: <X className="h-3.5 w-3.5" strokeWidth={1.75} />,
      }}
      toastOptions={{
        classNames: {
          toast: "portfolio-toast",
          title: "portfolio-toast-title",
          description: "portfolio-toast-description",
          icon: "portfolio-toast-icon",
          closeButton: "portfolio-toast-close",
          success: "portfolio-toast-success",
          error: "portfolio-toast-error",
          info: "portfolio-toast-info",
          warning: "portfolio-toast-warning",
          loading: "portfolio-toast-loading",
        },
      }}
      {...props}
    />
  );
};

export {Toaster};
