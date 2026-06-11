import satori, { type SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";

export interface OgImageProps {
  title: string;
  subtitle?: string;
  siteName?: string;
}

export interface OgRenderOptions {
  fonts: SatoriOptions["fonts"];
  width?: number;
  height?: number;
}

export const renderOgImage = async (
  props: OgImageProps,
  options: OgRenderOptions
): Promise<Buffer> => {
  const { title, subtitle, siteName } = props;
  const width = options.width ?? 1200;
  const height = options.height ?? 630;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#ffffff",
          fontFamily: "OG",
        },
        children: [
          siteName && {
            type: "div",
            props: {
              style: {
                fontSize: 32,
                color: "#666666",
                marginBottom: 24,
              },
              children: siteName,
            },
          },
          {
            type: "div",
            props: {
              style: {
                fontSize: 72,
                fontWeight: 700,
                color: "#000000",
                lineHeight: 1.1,
              },
              children: title,
            },
          },
          subtitle && {
            type: "div",
            props: {
              style: {
                fontSize: 32,
                color: "#444444",
                marginTop: 24,
              },
              children: subtitle,
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width,
      height,
      fonts: options.fonts,
    }
  );

  return new Resvg(svg).render().asPng();
};
