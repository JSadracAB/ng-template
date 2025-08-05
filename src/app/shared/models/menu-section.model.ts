export interface MenuSection {
  title: string;
  icon: string;
  route?: string;
  isDisabled?: boolean; // Optional property to disable the section
  children?: MenuSection[]; // Optional nested sections
}
