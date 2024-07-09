import Phone from "@/assets/icons/phone.svg?react";
import Mail from "@/assets/icons/mail.svg?react";
import Location from "@/assets/icons/location.svg?react";
import Twitter from "@/assets/icons/twitter.svg?react";
import Facebook from "@/assets/icons/facebook.svg?react";
import Instagram from "@/assets/icons/instagram.svg?react";
import { Element } from "react-scroll";

const List = ({ className, children }) => {
  return <li className={`flex p-1 text-teal-900 ${className}`}>{children}</li>;
};

const Footer = () => {
  return (
    <Element id="contact" name="contact" className="section mt-20">
      <div className=" bg-neutral-200 mt-4 flex justify-evenly">
        <div className="py-8">
          <ul>
            <li className="text-xl text-teal-900 my-2 ">Contact Us</li>
            <List>
              <Phone className="icon w-4 mr-2" />
              09-000-999-111
            </List>
            <List>
              <Mail className="icon w-4 mr-2" />
              shoppy@gmail.com
            </List>
            <List>
              <Location className="icon w-4 mr-2" />
              Califonia , New York
            </List>
          </ul>
        </div>
        <div className="py-8">
          <h2 className="text-xl my-2  text-teal-900">Follow Us On</h2>
          <ul className="flex">
            <List>
              <Twitter className="icon w-6 mr-4" />
            </List>
            <List>
              <Facebook className="icon w-6 mr-4" />
            </List>
            <List>
              <Instagram className="icon w-6 mr-4" />
            </List>
          </ul>
        </div>
      </div>
    </Element>
  );
};

export default Footer;
