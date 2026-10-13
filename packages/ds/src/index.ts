// Context & utilities
export {
  SurfaceProvider,
  SurfaceStep,
  useSurface,
  useNextSurfaceLevel,
  getSurfaceClass,
  getNextSurfaceLevel,
  clampSurfaceLevel,
} from "@/components/custom/surface-context"
export type {
  SurfaceLevel,
  SurfaceContextValue,
  SurfaceProviderProps,
} from "@/components/custom/surface-context"

export { ThemeProvider, useTheme } from "@/components/theme-provider"

// Custom components
export { Status } from "@/components/custom/status"
export type { StatusProps, StatusColor, StatusFill, StatusTextStyle, StatusSize } from "@/components/custom/status"

/** @deprecated Use Status instead */
export { StatusBadge } from "@/components/custom/status-badge"
export type { StatusBadgeProps, StatusBadgeStatus, StatusBadgeSize } from "@/components/custom/status-badge"

export { DataTable } from "@/components/custom/data-table"
export type { DataTableProps, ColumnDef } from "@/components/custom/data-table"

export { FilterBar } from "@/components/custom/filter-bar"
export type { FilterBarProps } from "@/components/custom/filter-bar"

export { PageShell } from "@/components/custom/page-shell"
export type { PageShellProps } from "@/components/custom/page-shell"

export { NavItem } from "@/components/custom/nav-item"
export type { NavItemProps } from "@/components/custom/nav-item"

export { SidebarNav } from "@/components/custom/sidebar-nav"
export type { SidebarNavProps, SidebarNavGroup, SidebarNavItem, SidebarNavBottomItem } from "@/components/custom/sidebar-nav"

export { Logo } from "@/components/custom/logo"
export type { LogoProps } from "@/components/custom/logo"

export { Logomark } from "@/components/custom/logomark"
export type { LogomarkProps } from "@/components/custom/logomark"

// Custom icons
export { CollapseMenuIcon } from "@/components/custom/icons/collapse-menu-icon"
export type { CollapseMenuIconProps } from "@/components/custom/icons/collapse-menu-icon"
export { ContactIcon } from "@/components/custom/icons/contact-icon"
export type { ContactIconProps } from "@/components/custom/icons/contact-icon"
export { DataIntegrationToolIcon } from "@/components/custom/icons/data-integration-tool-icon"
export type { DataIntegrationToolIconProps } from "@/components/custom/icons/data-integration-tool-icon"
export { DiamondsInIcon } from "@/components/custom/icons/diamonds-in-icon"
export type { DiamondsInIconProps } from "@/components/custom/icons/diamonds-in-icon"
export { DiamondsOutIcon } from "@/components/custom/icons/diamonds-out-icon"
export type { DiamondsOutIconProps } from "@/components/custom/icons/diamonds-out-icon"
export { GradedIcon } from "@/components/custom/icons/graded-icon"
export type { GradedIconProps } from "@/components/custom/icons/graded-icon"
export { HelpIcon } from "@/components/custom/icons/help-icon"
export type { HelpIconProps } from "@/components/custom/icons/help-icon"
export { IntegrationIcon } from "@/components/custom/icons/integration-icon"
export type { IntegrationIconProps } from "@/components/custom/icons/integration-icon"
export { InventoryIcon } from "@/components/custom/icons/inventory-icon"
export type { InventoryIconProps } from "@/components/custom/icons/inventory-icon"
export { LogOutIcon } from "@/components/custom/icons/log-out-icon"
export type { LogOutIconProps } from "@/components/custom/icons/log-out-icon"
export { MonitoringIcon } from "@/components/custom/icons/monitoring-icon"
export type { MonitoringIconProps } from "@/components/custom/icons/monitoring-icon"
export { PolishedIcon } from "@/components/custom/icons/polished-icon"
export type { PolishedIconProps } from "@/components/custom/icons/polished-icon"
export { PortalIcon } from "@/components/custom/icons/portal-icon"
export type { PortalIconProps } from "@/components/custom/icons/portal-icon"
export { RoughIcon } from "@/components/custom/icons/rough-icon"
export type { RoughIconProps } from "@/components/custom/icons/rough-icon"
export { SplitIcon } from "@/components/custom/icons/split-icon"
export type { SplitIconProps } from "@/components/custom/icons/split-icon"

// Diamond shape icons
export { RoundShapeIcon } from "@/components/custom/icons/shapes/round-shape-icon"
export type { RoundShapeIconProps } from "@/components/custom/icons/shapes/round-shape-icon"
export { PrincessShapeIcon } from "@/components/custom/icons/shapes/princess-shape-icon"
export type { PrincessShapeIconProps } from "@/components/custom/icons/shapes/princess-shape-icon"
export { OvalShapeIcon } from "@/components/custom/icons/shapes/oval-shape-icon"
export type { OvalShapeIconProps } from "@/components/custom/icons/shapes/oval-shape-icon"
export { CushionShapeIcon } from "@/components/custom/icons/shapes/cushion-shape-icon"
export type { CushionShapeIconProps } from "@/components/custom/icons/shapes/cushion-shape-icon"
export { PearShapeIcon } from "@/components/custom/icons/shapes/pear-shape-icon"
export type { PearShapeIconProps } from "@/components/custom/icons/shapes/pear-shape-icon"
export { HeartShapeIcon } from "@/components/custom/icons/shapes/heart-shape-icon"
export type { HeartShapeIconProps } from "@/components/custom/icons/shapes/heart-shape-icon"
export { EmeraldShapeIcon } from "@/components/custom/icons/shapes/emerald-shape-icon"
export type { EmeraldShapeIconProps } from "@/components/custom/icons/shapes/emerald-shape-icon"
export { RadiantShapeIcon } from "@/components/custom/icons/shapes/radiant-shape-icon"
export type { RadiantShapeIconProps } from "@/components/custom/icons/shapes/radiant-shape-icon"
export { AsscherShapeIcon } from "@/components/custom/icons/shapes/asscher-shape-icon"
export type { AsscherShapeIconProps } from "@/components/custom/icons/shapes/asscher-shape-icon"
export { MarquiseShapeIcon } from "@/components/custom/icons/shapes/marquise-shape-icon"
export type { MarquiseShapeIconProps } from "@/components/custom/icons/shapes/marquise-shape-icon"

export { DiamondShapeIcon, DIAMOND_SHAPE_CONFIG } from "@/components/custom/diamond-shape-icon"
export type { DiamondShapeIconProps } from "@/components/custom/diamond-shape-icon"

export { PageHeader } from "@/components/custom/page-header"
export type { PageHeaderProps, PageProperty, EnvironmentTag } from "@/components/custom/page-header"

export { PageToolbar } from "@/components/custom/page-toolbar"
export type { PageToolbarProps } from "@/components/custom/page-toolbar"

export { PaginationFooter } from "@/components/custom/pagination-footer"
export type { PaginationFooterProps } from "@/components/custom/pagination-footer"

export { Confirmation, ConfirmationIcon } from "@/components/custom/confirmation"
export type { ConfirmationProps, ConfirmationAction, ConfirmationIconProps, ConfirmationIconVariant } from "@/components/custom/confirmation"

export { ActionPageGroup } from "@/components/custom/action-page-group"
export type { ActionPageGroupProps, ActionPageGroupItem, ActionPageGroupVariant } from "@/components/custom/action-page-group"

export { TabsNav } from "@/components/custom/tabs"
export type { TabsNavProps, TabItem, TabsType, TabsSize, TabsOrientation } from "@/components/custom/tabs"

export { Stepper } from "@/components/custom/stepper"
export type { StepperProps, StepItem, StepStatus, StepperSize, StepperOrientation } from "@/components/custom/stepper"

export { TableSelectionBar } from "@/components/custom/table-selection-bar"
export type { TableSelectionBarProps, TableSelectionAction } from "@/components/custom/table-selection-bar"

export { TableSkeleton } from "@/components/custom/table-skeleton"
export type { TableSkeletonProps } from "@/components/custom/table-skeleton"

export { InventoryTable, generateDiamonds, DIAMOND_STATUS_CONFIG } from "@/components/custom/inventory-table"
export type { InventoryTableProps, Diamond, DiamondStatus, DiamondClarity, DiamondColour, DiamondShape } from "@/components/custom/inventory-table"

export { TransferDrawer } from "@/components/custom/transfer-drawer"
export type { TransferDrawerProps, TransferStep, TransferSelection, TransferResult } from "@/components/custom/transfer-drawer"

export { DiamondPreviewDrawer } from "@/components/custom/diamond-preview-drawer"
export type { DiamondPreviewDrawerProps } from "@/components/custom/diamond-preview-drawer"

export { Backdrop } from "@/components/custom/backdrop"
export type { BackdropProps } from "@/components/custom/backdrop"

export { Drawer, DrawerProvider } from "@/components/custom/drawer"
export type { DrawerProps, DrawerSize } from "@/components/custom/drawer"

// shadcn/ui primitives
export { Badge, badgeVariants } from "@/components/ui/badge"
export type { BadgeProps } from "@/components/ui/badge"
export { Button, buttonVariants } from "@/components/ui/button"
export { Input, inputVariants } from "@/components/ui/input"
export type { InputProps, InputVariantProps } from "@/components/ui/input"
export { FormField } from "@/components/ui/form-field"
export type { FormFieldProps } from "@/components/ui/form-field"
export { Checkbox, CheckboxField } from "@/components/ui/checkbox"
export type { CheckboxProps, CheckboxFieldProps, CheckboxSize, CheckboxVariant } from "@/components/ui/checkbox"
export { RadioGroup, RadioGroupItem, RadioField } from "@/components/ui/radio"
export type { RadioGroupItemProps, RadioFieldProps, RadioSize, RadioVariant } from "@/components/ui/radio"
export { Separator } from "@/components/ui/separator"
export { Skeleton } from "@/components/ui/skeleton"
export type { SkeletonProps } from "@/components/ui/skeleton"
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Utilities
export { cn } from "@/lib/utils"
