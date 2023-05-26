import Link from 'next/link';

const Header = () => {
    return (
      <ul className="flex">
        <li className="flex-1 mr-2">
          <Link className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="#">
            Home
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white" href="/upload">
            Upload
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link className="text-center block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4" href="#">
            Nav Item
          </Link>
        </li>
        <li className="text-center flex-1">
          <Link className="block py-2 px-4 text-gray-400 cursor-not-allowed" href="#">
            Disabled Item
          </Link>
        </li>
      </ul>
    )
}

export default Header;