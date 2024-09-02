import Feed from "@components/Feed"

/* page.jsx is the actual "Home" page at localhost:3000 */

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">   {/* We use Tailwind CSS classes to style the page ! */}
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient"> AI-Powered Prompts </span>
        </h1> {/* classNames with _ in it come from OUR OWN globals.css */}
        <p className="desc text-center">
            Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
        </p>

        <Feed />
    </section>
  )
}

export default Home