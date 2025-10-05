import React, { useEffect, useState } from 'react'
import Styles from "./About.module.css"
import vision from "../../assets/vision.svg"
import method from "../../assets/method.svg"
import { FaAnglesRight, FaAnglesLeft, FaAngleLeft, FaAngleRight, FaGithub, FaLinkedin } from "react-icons/fa6";
import Pagination from "../../utils/Pagination.js"




function About() {

    const FOUNDER_NAME = "Prananya"
    const FOUNDER_LINKEDIN_URL = "https://www.linkedicom/in/pranavbarthwal03/"
    const CARDS_PER_PAGE = 8;
    const repoName = "UrbanScope";

    const [contributors, setContributors] = useState([]);
    const [founder, setFounder] = useState({});
    const [currentPage, setCurrentPage] = useState(1); // to store pagination number.
    const [pageinatedContributors, setPageinatedContributors] = useState([]);


    useEffect(() => {
        fetchContributors()
    }, [])

    useEffect(() => {
        setPageinatedContributors(Pagination.Paginate(contributors, currentPage, CARDS_PER_PAGE));
    }, [contributors, currentPage])

    async function fetchContributors() {
        try {
            const response = await fetch(`https://api.github.com/repos/${FOUNDER_NAME}/${repoName}/contributors`)

            if (!response.ok) {
                console.error('Failed to fetch contributors:', response.status);
                setContributors([]);
                return;
            }

            const data = await response.json();

            // Check if data is an array
            if (!Array.isArray(data)) {
                console.error('Contributors data is not an array:', data);
                setContributors([]);
                return;
            }

            setContributors((prev) => {
                return data.filter((user, idx) => user.login != FOUNDER_NAME);
            })

            setFounder(data.find((user) => user.login == FOUNDER_NAME) || {});

        } catch (error) {
            console.error('Error fetching contributors:', error.message);
            setContributors([]);
            setFounder({});
        }
    }
    return (
        <div id={Styles.container}>

            <section id={Styles.section_1}>
                <h1>About UrbanScope</h1>
                <p><b>
                    "UrbanScope is your gateway to understanding urban health through NASA Earth observations. Making satellite data accessible for healthier cities and sustainable communities."
                </b></p>
            </section>

            <section id={Styles.section_2}>
                <h1><u>Our Vision </u></h1>
                <div>
                    <p>Explore urban health with UrbanScope and stay informed about how NASA Earth observations can drive healthier cities. Join us in discovering patterns in heat islands, air quality, and green spaces. As an open source organization, we are committed to transparency, collaboration, and community-driven development.</p>
                    <img src={vision} width='400px' height='400px' />
                </div>
            </section>

            <section id={Styles.section_3}>
                <h1><u>Our Methods</u></h1>
                <div>
                    <img src={method} width='400px' height='400px' />
                    <p>Our platform brings you NASA Earth observation data including land surface temperature, vegetation indices, and air quality metrics. Utilizing NASA's GIBS API and EARTHDATA services, we deliver a seamless experience for city planners, researchers, and citizens to understand urban health patterns.</p>
                </div>
            </section>

            <section id={Styles.section_4}>

                <div id={Styles.founder}>
                    <h1><u>Our </u></h1>
                    <div>
                        <img src={founder.avatar_url} />
                        <h3>{founder.login}</h3>
                        <div id={Styles.social}>
                            <a href={founder.html_url} target='_blank'><FaGithub size={30} /></a>
                            <a href={FOUNDER_LINKEDIN_URL} target='_blank'><FaLinkedin size={30} /></a>
                        </div>
                    </div>
                </div>

                <div id={Styles.contributors}>
                    <h2><u>Our Contributors</u></h2>

                    <div id={Styles.cards}>
                        {
                            pageinatedContributors.map((user, idx) => (
                                <div key={idx} className={Styles.card}>
                                    <img src={user.avatar_url} />
                                    <h3>{user.login}</h3>
                                    <div id={Styles.social}>
                                        <a href={user.html_url} target='_blank'><FaGithub size={30} /></a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div id={Styles['page-btns']}>
                        <FaAnglesLeft className={Styles['page-icons']} size={30} onClick={() => setCurrentPage(Pagination.StartPage(contributors, currentPage, CARDS_PER_PAGE))} />
                        <FaAngleLeft className={Styles['page-icons']} size={25} onClick={() => setCurrentPage(Pagination.PrevPage(contributors, currentPage, CARDS_PER_PAGE))} />

                        <span id={Styles['page-num']}>{currentPage}</span>

                        <FaAngleRight className={Styles['page-icons']} size={25} onClick={() => setCurrentPage(Pagination.NextPage(contributors, currentPage, CARDS_PER_PAGE))} />
                        <FaAnglesRight className={Styles['page-icons']} size={30} onClick={() => setCurrentPage(Pagination.LastPage(contributors, currentPage, CARDS_PER_PAGE))} />
                    </div>
                </div>

            </section>


        </div>
    )
}

export default About