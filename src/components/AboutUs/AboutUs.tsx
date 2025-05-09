import MadeInUkraine from "../MadeInUkraine/MadeInUkraine"
import "./AboutUs.scss"

const teamMembers = [
  {
    name: "Vitali Pavlyk",
    role: "Team lead / Backend developer",

    img: "http://localhost:5173/Team_project_FE/src/images/team/vitalii.png",
    socials: ["github", "linkedin", "facebook"],
    // },src\images\team\vitalii.png
  },
  {
    name: "Oleksii Kolinko",
    role: "Backend developer",
    img: "http://localhost:5173/Team_project_FE/src/images/team/oleksii.png",
    socials: ["github", "linkedin", "facebook"],
  },
  {
    name: "Artem Furhaus",
    role: "Frontend developer",
    img: "http://localhost:5173/Team_project_FE/src/images/team/artem.png",
    socials: ["github", "linkedin", "facebook"],
  },
  {
    name: "Romela Gasparian",
    role: "UX/UI designer",
    img: "http://localhost:5173/Team_project_FE/src/images/team/romela.png",
    socials: ["behance", "linkedin", "dribbble"],
  },
  {
    name: "Yevhen Perekhodov",
    role: "QA engineer",
    img:  "http://localhost:5173/Team_project_FE/src/images/team/yevhen.png",
    socials: ["github", "linkedin", "facebook"],
  },
  {
    name: "Oleksandra Chumak",
    role: "Data analyst",
    img: "http://localhost:5173/Team_project_FE/src/images/team/oleksandra.png",
    socials: ["github", "linkedin", "facebook"],
  },
]

const AboutUs = () => (
  <section className="team-section">
    <h1>ABOUT US</h1>
    <p className="subtitle">Meet the Team behind Muvio</p>
    <p className="description">
      We are a team of 7 passionate individuals from different parts of Ukraine,
      united by our love for IT and its power to make life better and easier.
    </p>

    <div className="team-grid">
      {teamMembers.map((member, index) => (
        <div className={`team-card team-card--item-${index}`} key={index}>
          {/* <div
            className="team-photo"
            style={{ backgroundImage: `url(${member.img})` }}
            aria-label={member.name}
          /> */}
          <img src={member.img} alt={member.name} className="team-photo" />

          <h3>{member.name}</h3>
          <p>{member.role}</p>
          <div className="social-icons">
            {member.socials.map((icon, i) => (
              <i key={i} className={`icon-${icon}`} />
            ))}
          </div>
        </div>
      ))}
    </div>
    <MadeInUkraine/>
  </section>
)

export default AboutUs
