//@ts-nocheck
import { AstroContentSdkComponent } from '@astro-sitecore-jss/astro-content-sdk';

// Components imported from the app itself
import Title from 'src/components/Title.astro';
import RowSplitter from 'src/components/RowSplitter.astro';
import RichText from 'src/components/RichText.astro';
import Promo from 'src/components/Promo.astro';
import PageContent from 'src/components/PageContent.astro';
import Navigation from 'src/components/Navigation.astro';
import LinkList from 'src/components/LinkList.astro';
import Image from 'src/components/Image.astro';
import ContentBlock from 'src/components/ContentBlock.astro';
import Container from 'src/components/Container.astro';
import ColumnSplitter from 'src/components/ColumnSplitter.astro';
import ThemeSwitcher from 'src/components/Utilities/ThemeSwitcher.astro';
import LoanCalculator from 'src/components/Utilities/LoanCalculator.astro';
import LanguageSwitcher from 'src/components/Utilities/LanguageSwitcher.astro';
import ContactForm from 'src/components/Utilities/ContactForm.astro';
import ApplicationForm from 'src/components/Utilities/ApplicationForm.astro';
import PartialDesignDynamicPlaceholder from 'src/components/PartialDesignDynamicPlaceholder/PartialDesignDynamicPlaceholder.astro';
import TwoColumnCta from 'src/components/PageContent/TwoColumnCta.astro';
import ThreeColumnCta from 'src/components/PageContent/ThreeColumnCta.astro';
import Testimonials from 'src/components/PageContent/Testimonials.astro';
import StatsCounter from 'src/components/PageContent/StatsCounter.astro';
import Quote from 'src/components/PageContent/Quote.astro';
import Questions from 'src/components/PageContent/Questions.astro';
import PromoCta from 'src/components/PageContent/PromoCta.astro';
import ProjectList from 'src/components/PageContent/ProjectList.astro';
import ProjectDetails from 'src/components/PageContent/ProjectDetails.astro';
import ParallaxBanner from 'src/components/PageContent/ParallaxBanner.astro';
import PageBackground from 'src/components/PageContent/PageBackground.astro';
import ImageGallery from 'src/components/PageContent/ImageGallery.astro';
import HeroBanner from 'src/components/PageContent/HeroBanner.astro';
import Hero from 'src/components/PageContent/Hero.astro';
import HeadingCta from 'src/components/PageContent/HeadingCta.astro';
import FourColumnCta from 'src/components/PageContent/FourColumnCta.astro';
import FiveColumnCta from 'src/components/PageContent/FiveColumnCta.astro';
import Features from 'src/components/PageContent/Features.astro';
import DocumentsList from 'src/components/PageContent/DocumentsList.astro';
import CtaBanner from 'src/components/PageContent/CtaBanner.astro';
import Comparison from 'src/components/PageContent/Comparison.astro';
import Carousel from 'src/components/PageContent/Carousel.astro';
import AuthorWidget from 'src/components/PageContent/AuthorWidget.astro';
import AuthorList from 'src/components/PageContent/AuthorList.astro';
import AuthorDetails from 'src/components/PageContent/AuthorDetails.astro';
import ArticleList from 'src/components/PageContent/ArticleList.astro';
import ArticleDetails from 'src/components/PageContent/ArticleDetails.astro';
import AppPromo from 'src/components/PageContent/AppPromo.astro';
import Accordion from 'src/components/PageContent/Accordion.astro';
import ParallaxBackgroundImage from 'src/components/NonSitecore/ParallaxBackgroundImage.astro';
import IconAccent from 'src/components/NonSitecore/IconAccent.astro';
import DottedAccent from 'src/components/NonSitecore/DottedAccent.astro';
import CountUp from 'src/components/NonSitecore/CountUp.astro';
import Header from 'src/components/Navigation/Header.astro';
import Footer from 'src/components/Navigation/Footer.astro';
import Eyebrow from 'src/components/Navigation/Eyebrow.astro';
import Breadcrumb from 'src/components/Navigation/Breadcrumb.astro';


// Components must be registered within the map to match the string key with component name in Sitecore
export const componentMap = new Map<string, AstroContentSdkComponent>([
  ['Title', Title],
  ['RowSplitter', RowSplitter],
  ['RichText', RichText],
  ['Promo', Promo],
  ['PageContent', PageContent],
  ['Navigation', Navigation],
  ['LinkList', LinkList],
  ['Image', Image],
  ['ContentBlock', ContentBlock],
  ['Container', Container],
  ['ColumnSplitter', ColumnSplitter],
  ['ThemeSwitcher', ThemeSwitcher],
  ['LoanCalculator', LoanCalculator],
  ['LanguageSwitcher', LanguageSwitcher],
  ['ContactForm', ContactForm],
  ['ApplicationForm', ApplicationForm],
  ['PartialDesignDynamicPlaceholder', PartialDesignDynamicPlaceholder],
  ['TwoColumnCta', TwoColumnCta],
  ['ThreeColumnCta', ThreeColumnCta],
  ['Testimonials', Testimonials],
  ['StatsCounter', StatsCounter],
  ['Quote', Quote],
  ['Questions', Questions],
  ['PromoCta', PromoCta],
  ['ProjectList', ProjectList],
  ['ProjectDetails', ProjectDetails],
  ['ParallaxBanner', ParallaxBanner],
  ['PageBackground', PageBackground],
  ['ImageGallery', ImageGallery],
  ['HeroBanner', HeroBanner],
  ['Hero', Hero],
  ['HeadingCta', HeadingCta],
  ['FourColumnCta', FourColumnCta],
  ['FiveColumnCta', FiveColumnCta],
  ['Features', Features],
  ['DocumentsList', DocumentsList],
  ['CtaBanner', CtaBanner],
  ['Comparison', Comparison],
  ['Carousel', Carousel],
  ['AuthorWidget', AuthorWidget],
  ['AuthorList', AuthorList],
  ['AuthorDetails', AuthorDetails],
  ['ArticleList', ArticleList],
  ['ArticleDetails', ArticleDetails],
  ['AppPromo', AppPromo],
  ['Accordion', Accordion],
  ['ParallaxBackgroundImage', ParallaxBackgroundImage],
  ['IconAccent', IconAccent],
  ['DottedAccent', DottedAccent],
  ['CountUp', CountUp],
  ['Header', Header],
  ['Footer', Footer],
  ['Eyebrow', Eyebrow],
  ['Breadcrumb', Breadcrumb],
]);

export default componentMap;
