import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImage from "../assets/Images/aboutMainImage.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData.jsx";
function AboutUs()
{
    return(
        <HomeLayout>
            <div className="pl-20 pt-20 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                            Affordable and Quality Education
                        </h1>
                        <p className="text-xl text-gray-200 ">
                            Our Goal is to provide affordable and qualit education to the world.
                            we are providing the platform for the aspuring teachers and studets to share
                            their skills,creativity and knowledge to each other to empower and contribute
                            in the growth and wellness of mankind
                        </p>

                    </section>
                    <div className="w-1/2">
                    <img
                            id="test1"
                            alt="about main image"
                            className="drop-shadow-2xl"
                            src={aboutMainImage}
                        />
                    </div>
                </div>
                <div className="carousel w-1/2 m-auto my-16">
                    {celebrities && celebrities.map(celebrity => (<CarouselSlide 
                                                                    {...celebrity} 
                                                                    key={celebrity.slideNumber} 
                                                                    totalSlides={celebrities.length}
                                                                    
                                                                />))}
                    
                </div>


            </div>

        </HomeLayout>
    )

}

export default AboutUs;