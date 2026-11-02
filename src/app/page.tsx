import HeroMotion from "@/components/sections/HeroMotion";
import InstagramLatest from "@/components/sections/InstagramLatest";
import InstagramSection from "@/components/sections/InstagramSection";
import StoryScroll from "@/components/sections/StoryScroll";
import YouTubeLatest from "@/components/sections/YoutubeLatest";
import YouTubeSection from "@/components/sections/YoutubeSection";

export default function Home() {
  return (
    <>
      <HeroMotion />
      <StoryScroll />
      <YouTubeLatest />
      <InstagramLatest />
    </>
  );
}
