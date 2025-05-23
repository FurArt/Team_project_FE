import { useState } from "react"
import UkraineHoverToggle from "../UkraineHoverToggle/UkraineHoverToggle"
import "./AboutUs.scss"
import GitHubIcon from "@mui/icons-material/GitHub"
import TelegramIcon from "@mui/icons-material/Telegram"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const teamMembers = [
  {
    name: "Vitali Pavlyk",
    role: "Team lead / Backend developer",
    img: "images/vitalii.png",
    socials: [
      { telegram: "https://t.me/petrgigi" },
      { linkedin: "https://www.linkedin.com/in/vitalii-pavlyk-82b5aa1a1/" },
      { github: "https://github.com/4Vitalii5" },
    ],
    quote:
      "“If you don't know how to build a service, and you just keep experimenting, in the end you don't know how, but it can work, at the same time, If it breaks, it will be hard to repeat the trick twice. On the other hand, if you know how to build a service and do everything responsibly and accurately, it has no chance of breaking down.”",
  },
  {
    name: "Oleksii Kolinko",
    role: "Backend developer",
    img: "images/oleksii.png",
    socials: [
      { telegram: "https://t.me/u_918845463" },
      { linkedin: "https://www.linkedin.com/in/oleksii-kolinko-3724272a6" },
      { github: "https://github.com/OleksiiKolinko" },
    ],
    quote:
      "“Less time choosing, more time watching — thanks to smart backend logic”.",
  },
  {
    name: "Artem Furhaus",
    role: "Frontend developer",
    img: "images/artem.png",
    socials: [
      { telegram: "https://t.me/ArtemFurhaus" },
      { linkedin: "https://www.linkedin.com/in/artemfurhas/" },
      { github: "https://github.com/FurArt/" },
    ],
    quote:
      "“Frontend development isn’t just about making things look good — it’s about making interfaces feel effortless.”",
  },
  {
    name: "Anna Tuhusova",
    role: "Frontend developer",
    img: "images/anna.png",
    socials: [
      { telegram: "https://t.me/annathsv" },
      { linkedin: "https://www.linkedin.com/in/anna-tuhusova-32758a152/" },
      { github: "https://github.com/tuhusova" },
    ],
    quote:
      "“”",
  },
  {
    name: "Romela Gasparian",
    role: "UX/UI designer",
    img: "images/romela.png",
    socials: [
      { telegram: "https://t.me/romrian" },
      { linkedin: "https://www.linkedin.com/in/romela-g-6954b034b/" },
      { behance: "https://www.behance.net/romelagasparian" },
    ],
    quote:
      "“I don't create design just for the sake of beauty. My approach is a balance between creativity and practicality. It's important not only to come up with something stylish, but also to make it functional and user-friendly.”",
  },
  {
    name: "Yevhen Perekhodov",
    role: "QA engineer",
    img: "images/yevhen.png",
    socials: [
      { telegram: "https://t.me/yevhenqa" },
      { linkedin: "https://www.linkedin.com/in/yevhen-perekhodov-129b621a6/" },
      { github: "https://github.com/evhenqa" },
    ],
    quote:
      "“Always dig deep into why things happen, not just what happens. I will make the best of what I have and transform it into something truly extraordinary”.",
  },
  {
    name: "Oleksandra Chumak",
    role: "Data analyst",
    img: "images/oleksandra.png",
    socials: [
      { telegram: "https://t.me/oleksandrach" },
      { linkedin: "https://www.linkedin.com/in/oleksandra-chumak-070b8a1b4/" },
      { github: "https://github.com/oleksandrach" },
    ],
    quote:
      "“I analyze data to find insights that transform projects/business for the better”.",
  },
]

export function LinkedInIconDesign(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9999 0.44043C5.16774 0.44043 0.439941 5.16823 0.439941 11.0004C0.439941 16.8326 5.16774 21.5604 10.9999 21.5604C16.8321 21.5604 21.5599 16.8326 21.5599 11.0004C21.5599 5.16823 16.8321 0.44043 10.9999 0.44043ZM8.41494 15.3773H6.27654V8.49573H8.41494V15.3773ZM7.33254 7.65093C6.65714 7.65093 6.22044 7.17243 6.22044 6.58063C6.22044 5.97673 6.67034 5.51253 7.36004 5.51253C8.04974 5.51253 8.47214 5.97673 8.48534 6.58063C8.48534 7.17243 8.04974 7.65093 7.33254 7.65093ZM16.2249 15.3773H14.0865V11.5636C14.0865 10.6759 13.7763 10.0731 13.003 10.0731C12.4123 10.0731 12.0614 10.4812 11.9063 10.8739C11.8491 11.0136 11.8348 11.2116 11.8348 11.4085V15.3762H9.69534V10.6902C9.69534 9.83113 9.66784 9.11283 9.63924 8.49463H11.4971L11.595 9.45053H11.6379C11.9195 9.00173 12.6092 8.33953 13.7631 8.33953C15.17 8.33953 16.2249 9.28223 16.2249 11.3084V15.3773Z"
        fill="#F1F3F3"
      />
    </svg>
  )
}

export function TelegramIconDesign(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14.64 6.8C14.49 8.38 13.84 12.22 13.51 13.99C13.37 14.74 13.09 14.99 12.83 15.02C12.25 15.07 11.81 14.64 11.25 14.27C10.37 13.69 9.87 13.33 9.02 12.77C8.03 12.12 8.67 11.76 9.24 11.18C9.39 11.03 11.95 8.7 12 8.49C12.0069 8.45819 12.006 8.42517 11.9973 8.3938C11.9886 8.36244 11.9724 8.33367 11.95 8.31C11.89 8.26 11.81 8.28 11.74 8.29C11.65 8.31 10.25 9.24 7.52 11.08C7.12 11.35 6.76 11.49 6.44 11.48C6.08 11.47 5.4 11.28 4.89 11.11C4.26 10.91 3.77 10.8 3.81 10.45C3.83 10.27 4.08 10.09 4.55 9.9C7.47 8.63 9.41 7.79 10.38 7.39C13.16 6.23 13.73 6.03 14.11 6.03C14.19 6.03 14.38 6.05 14.5 6.15C14.6 6.23 14.63 6.34 14.64 6.42C14.63 6.48 14.65 6.66 14.64 6.8Z"
        fill="#F1F3F3"
      />
    </svg>
  )
}

export function BehanceIconDesign(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.76 11.1899C14.6208 11.1894 14.4829 11.2179 14.3553 11.2737C14.2277 11.3295 14.1132 11.4113 14.0191 11.5139C13.9249 11.6165 13.8533 11.7376 13.8087 11.8695C13.764 12.0015 13.7475 12.1412 13.76 12.2799H15.82C15.8333 12.136 15.8153 11.991 15.7671 11.8547C15.719 11.7185 15.6419 11.5943 15.5412 11.4907C15.4404 11.3871 15.3184 11.3066 15.1836 11.2546C15.0487 11.2027 14.9042 11.1806 14.76 11.1899ZM9.49001 12.2999H8.26001V14.2399H9.26001C10.26 14.2399 10.7 13.9099 10.7 13.2399C10.7 12.5699 10.24 12.2999 9.49001 12.2999ZM10.36 10.5199C10.36 9.98992 10.01 9.66992 9.41001 9.66992H8.26001V11.4099H9.11001C10 11.4099 10.36 11.0899 10.36 10.5199Z"
        fill="#F1F3F3"
      />
      <path
        d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM9.7 15.2H7V8.7H9.7C10.87 8.7 11.64 9.31 11.64 10.3C11.6538 10.6326 11.5486 10.9592 11.3434 11.2213C11.1381 11.4834 10.8462 11.6637 10.52 11.73C10.7267 11.7348 10.9303 11.7817 11.1183 11.8679C11.3063 11.9541 11.4747 12.0777 11.6132 12.2312C11.7518 12.3848 11.8575 12.5649 11.924 12.7607C11.9905 12.9565 12.0164 13.1639 12 13.37C12 14.53 11 15.2 9.7 15.2ZM13.25 9.2H16.25V9.7H13.25V9.2ZM17 13.05H13.7V13.19C13.6828 13.342 13.6984 13.4958 13.7457 13.6413C13.793 13.7867 13.8709 13.9203 13.9742 14.0331C14.0775 14.1458 14.2037 14.2351 14.3445 14.295C14.4852 14.3548 14.6371 14.3838 14.79 14.38C15.0047 14.4133 15.2241 14.3679 15.4079 14.2522C15.5917 14.1364 15.7274 13.958 15.79 13.75H17C16.8923 14.23 16.6114 14.6535 16.211 14.9394C15.8107 15.2254 15.319 15.3538 14.83 15.3C14.5175 15.3316 14.2018 15.2943 13.9052 15.1907C13.6086 15.0871 13.3384 14.9199 13.1134 14.7006C12.8884 14.4814 12.7142 14.2155 12.6031 13.9217C12.4919 13.6279 12.4465 13.3133 12.47 13V12.56C12.4488 12.2565 12.4934 11.9519 12.6009 11.6673C12.7084 11.3826 12.8762 11.1246 13.0928 10.9109C13.3093 10.6972 13.5696 10.5328 13.8556 10.4291C14.1417 10.3254 14.4468 10.2847 14.75 10.31C15.0522 10.2906 15.3551 10.3362 15.6382 10.4437C15.9213 10.5512 16.1781 10.7182 16.3913 10.9332C16.6045 11.1483 16.7691 11.4066 16.8741 11.6906C16.9791 11.9747 17.0221 12.278 17 12.58V13.05Z"
        fill="#E6E6E6"
      />
    </svg>
  )
}


const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <GitHubIcon />
      case "linkedin":
        return <LinkedInIconDesign />
      case "telegram":
        return <TelegramIconDesign />
      case "behance":
        return <BehanceIconDesign />
      default:
        return null
    }
  }


  return (
    <section className="team-section">
      <h1>ABOUT US</h1>
      <p className="subtitle">Meet the Team behind Muvio</p>
      <p className="description">
        We are a team of 7 passionate individuals from different parts of
        Ukraine, united by our love for IT and its power to make life better and easier.
      </p>


      <div className="about-us__wrapper">
        <div className="about-us__lead">
          <div
            className={`team-card team-card--item--1 ${activeIndex === -1 ? "active" : ""}`}
            onClick={() => setActiveIndex(activeIndex === -1 ? null : -1)}
          >
            {activeIndex === -1 ? (
              <div className="team-quote">
                <p>{teamMembers[0].quote}</p>
              </div>
            ) : (
              <>
                <img
                  src={teamMembers[0].img}
                  alt={teamMembers[0].name}
                  className="team-photo"
                />
                <h3>{teamMembers[0].name}</h3>
                <p>{teamMembers[0].role}</p>

                <div className="social-icons">
                  {teamMembers[0].socials.map((social, i) => {
                    const [platform, url] = Object.entries(social)[0]

                    return (
                      <a
                        key={platform + i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {getSocialIcon(platform)}
                      </a>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="team-grid">
          {teamMembers.slice(1).map((member, index) => (
            <div
              className={`team-card team-card--item-${index} ${activeIndex === index ? "active" : ""}`}
              key={index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              {activeIndex === index ? (
                <div className="team-quote">
                  <p>{member.quote}</p>
                </div>
              ) : (
                <>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="team-photo"
                  />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <div className="social-icons">
                    {member.socials.map((social, i) => {
                      const [platform, url] = Object.entries(social)[0]
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-link"
                          onClick={e => e.stopPropagation()}
                        >
                          {getSocialIcon(platform)}
                        </a>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {<UkraineHoverToggle />}
    </section>
  )
}

export default AboutUs


