const AboutPage = () => {
  return (
    <section>
      <div className="absolute bg-primary-light w-full h-1/2 top-0 left-0 z-[-1]"></div>
      <div className="section-container w-full md:w-3/5 my-16">
        <div className="p-16 bg-white rounded shadow-md">
          <h2 className="title">About Government E-Learning</h2>

          <hr className="my-2 border-zinc-300" />

          <div className="space-y-4">
            <p className="indent-12">
              Government E-Learning is a leading government-provided e-learning
              platform dedicated to fostering education and empowering
              individuals to reach their full potential. Our platform offers a
              wide range of online video courses, study materials in the form of
              PDFs, and software tools designed to enhance the learning
              experience.
            </p>

            <p className="indent-12">
              We understand the importance of accessible education and strive to
              provide a user-friendly interface that enables learners of all
              backgrounds and skill levels to engage with our resources
              effectively. Whether you are a student seeking supplementary
              materials, a professional looking to enhance your skills, or an
              individual simply passionate about learning, Government E-Learning
              has something for you.
            </p>

            <h3 className="title">Our Courses:</h3>

            <p className="indent-12">
              Our comprehensive selection of online video courses covers a
              diverse range of subjects, from academic disciplines to
              professional development. We collaborate with experts in their
              respective fields to ensure that our courses are informative,
              engaging, and up-to-date. With easy-to-follow lessons, interactive
              quizzes, and practical assignments, you can acquire knowledge and
              skills at your own pace.
            </p>

            <h3 className="title">Study Materials:</h3>

            <p className="indent-12">
              In addition to our video courses, we provide a vast library of
              study materials in PDF format. These materials serve as valuable
              resources for further exploration and in-depth understanding of
              the subjects covered in our courses. Whether you prefer to read
              on-screen or print them out for offline studying, our study
              materials are designed to support your learning journey.
            </p>

            <h3 className="title">Software Tools:</h3>

            <p className="indent-12">
              To enhance your learning experience, we offer a range of software
              tools tailored to specific courses and subjects. These tools are
              designed to facilitate hands-on learning and provide practical
              applications of the concepts you learn. With our software tools,
              you can gain valuable skills and experience using
              industry-standard applications.
            </p>

            <h3 className="title">Commitment to Quality:</h3>

            <p className="indent-12">
              At Government E-Learning, we prioritize quality in all aspects of
              our platform. Our team works diligently to ensure that our courses
              and study materials are accurate, relevant, and of the highest
              standard. We continuously update our content to reflect the latest
              advancements and industry best practices, enabling you to stay
              ahead in your chosen field.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
