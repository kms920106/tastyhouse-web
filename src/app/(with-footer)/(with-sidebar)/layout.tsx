import Footer from '@/components/layouts/Footer'
import MenuSidebar from '@/components/layouts/menu-sidebar/MenuSidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/shadcn/sidebar'

export default function WithSidebarLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <MenuSidebar />
      <SidebarInset>
        {children}
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
