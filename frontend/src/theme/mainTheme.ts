import { theme } from 'antd';
import colors from './colors';
import { ThemeConfig } from 'antd/es/config-provider/context';


// Define color variables


const getCustomTheme = (isDarkMode: boolean): ThemeConfig => ({

  
  token: {
    colorPrimary: isDarkMode ? colors.primary : colors.primaryDark,
    colorLink: isDarkMode ? colors.link : colors.linkDark,
    borderRadius: 4,
    fontSize: 16,
    colorBgLayout: isDarkMode ? colors.background : colors.backgroundDark,
    colorBgContainer: isDarkMode ? colors.background2 : colors.background2Dark,
    colorText: isDarkMode ? colors.text : colors.textDark,
    colorTextDescription: isDarkMode ? colors.text : colors.textDark,
    colorTextHeading: isDarkMode ? colors.text : colors.textDark,
    colorTextLabel: isDarkMode ? colors.text : colors.textDark,
    colorTextQuaternary: isDarkMode ? colors.text : colors.textDark,
    colorTextTertiary: isDarkMode ? colors.text : colors.textDark,
    colorIcon: isDarkMode ? colors.text : colors.textDark,
    colorBgSolidActive: isDarkMode ? colors.primary : colors.primaryDark, 
    colorTextPlaceholder: isDarkMode ? colors.colorTextPlaceholderLight : colors.colorTextPlaceholderDark, 
    colorTextSecondary: isDarkMode ? colors.secondary : colors.textSecondaryDark,
    
  },
  algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
  components: {

  },
});

export default getCustomTheme;