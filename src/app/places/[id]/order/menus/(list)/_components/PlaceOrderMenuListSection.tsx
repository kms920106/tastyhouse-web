import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import MenuCategoryItem from '@/components/menus/MenuCategoryItem'
import MenuItem from '@/components/menus/MenuItem'
import AppButton from '@/components/ui/AppButton'
import BorderedSection from '@/components/ui/BorderedSection'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import SectionStack from '@/components/ui/SectionStack'
import type { MenuCategory } from '@/domains/place'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import CartItemCount from './CartItemCount'

interface PlaceOrderMenuListSectionProps {
  placeId: number
  menuCategories: MenuCategory[]
}

export default function PlaceOrderMenuListSection({
  placeId,
  menuCategories,
}: PlaceOrderMenuListSectionProps) {
  return (
    <section>
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>바로 주문하기</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        {menuCategories.map((menuCategory, index) => (
          <BorderedSection
            key={menuCategory.categoryName}
            className={`px-[15px] ${index === 0 ? '!border-t-0' : ''}`}
          >
            <MenuCategoryItem categoryName={menuCategory.categoryName}>
              {menuCategory.menus.map((menu) => (
                <Link
                  key={menu.id}
                  href={PAGE_PATHS.ORDER_MENU_DETAIL(placeId, menu.id)}
                  className="block"
                >
                  <MenuItem key={menu.id} menu={menu} />
                </Link>
              ))}
            </MenuCategoryItem>
          </BorderedSection>
        ))}
      </SectionStack>
      <FixedBottomSection className="px-[15px] py-2.5 !bg-[#f9f9f9]">
        <Link href={PAGE_PATHS.ORDER_CART(placeId)}>
          <AppButton className="bg-main gap-1">
            <CartItemCount placeId={placeId} />
          </AppButton>
        </Link>
      </FixedBottomSection>
      <div className="h-[71px] bg-white" />
    </section>
  )
}
