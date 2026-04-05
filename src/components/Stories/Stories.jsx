import Icon from '../Icon/Icon';
import { 
  mobileStoryImg, 
  mobileStoryImg1, 
  mobileStoryImg2,
  cardPpl1, 
  cardPpl2, 
  cardPpl3, 
  cardPpl4, 
  miniPic 
} from '../../assets';

const Stories = () => {
  // Desktop Stories Data
  const desktopStories = [
    { name: "Your Story", isOwn: true, img: cardPpl1 },
    { name: "Ryan Roslansky", isOwn: false, img: cardPpl2 },
    { name: "Ryan Roslansky", isOwn: false, img: cardPpl3 },
    { name: "Ryan Roslansky", isOwn: false, img: cardPpl4 },
  ];

  // Mobile Stories Data
  const mobileStories = [
    { name: "Your Story", isOwn: true, img: mobileStoryImg, isActive: true },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg1, isActive: true },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg2, isActive: false },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg1, isActive: true },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg2, isActive: false },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg1, isActive: true },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg, isActive: false },
    { name: "Ryan...", isOwn: false, img: mobileStoryImg1, isActive: true },
  ];

  return (
    <>
      {/* Desktop Stories - Visible on Desktop */}
      <div className="_feed_inner_ppl_card _mar_b16 _mar_t8 d-none d-md-block">
        <div className="_feed_inner_story_arrow">
          <button className="_feed_inner_story_arrow_btn">
            <Icon name="arrow-right" />
          </button>
        </div>
        <div className="row">
          {desktopStories.map((story, idx) => (
            <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col" key={idx}>
              <div className={`_b_radious6 ${story.isOwn ? "_feed_inner_profile_story" : "_feed_inner_public_story"}`}>
                <div className={story.isOwn ? "_feed_inner_profile_story_image" : "_feed_inner_public_story_image"}>
                  <img 
                    src={story.img} 
                    alt={story.name} 
                    className={story.isOwn ? "_profile_story_img" : "_public_story_img"} 
                  />
                  {story.isOwn ? (
                    <div className="_feed_inner_story_txt">
                      <div className="_feed_inner_story_btn">
                        <button className="_feed_inner_story_btn_link">
                          <Icon name="plus" />
                        </button>
                      </div>
                      <p className="_feed_inner_story_para">Your Story</p>
                    </div>
                  ) : (
                    <>
                      <div className="_feed_inner_pulic_story_txt">
                        <p className="_feed_inner_pulic_story_para">{story.name}</p>
                      </div>
                      <div className="_feed_inner_public_mini">
                        <img src={miniPic} alt="mini" className="_public_mini_img" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Stories - Visible on Mobile */}
      <div className="_feed_inner_ppl_card_mobile _mar_b16 d-block d-md-none _mar_t18">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list">
            {mobileStories.map((story, idx) => (
              <li className="_feed_inner_ppl_card_area_item" key={idx}>
                <a href="#0" className="_feed_inner_ppl_card_area_link">
                  <div className={`
                    ${story.isOwn ? "_feed_inner_ppl_card_area_story" : 
                      story.isActive ? "_feed_inner_ppl_card_area_story_active" : 
                      "_feed_inner_ppl_card_area_story_inactive"}
                  `}>
                    <img 
                      src={story.img} 
                      alt="Image" 
                      className={story.isOwn ? "_card_story_img" : "_card_story_img1"} 
                    />
                    {story.isOwn && (
                      <div className="_feed_inner_ppl_btn">
                        <button className="_feed_inner_ppl_btn_link" type="button">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                            <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                  <p className={`_feed_inner_ppl_card_area_${story.isOwn ? "link_txt" : "txt"}`}>
                    {story.name}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Stories;