import {
  SemanticIconStrokeWidthThin,
  SemanticIconStrokeWidthRegular,
  SemanticIconStrokeWidthThick,
} from "@/styles/tokens"

export type IconWeight = "thin" | "regular" | "thick"

export const iconStrokeWidth: Record<IconWeight, number> = {
  thin: SemanticIconStrokeWidthThin,
  regular: SemanticIconStrokeWidthRegular,
  thick: SemanticIconStrokeWidthThick,
}
