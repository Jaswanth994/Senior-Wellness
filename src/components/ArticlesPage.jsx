import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Header from '../Header';
import './ArticlesPage.css';

const ArticlesPage = () => {
  const location = useLocation();
  const { category, score } = location.state;
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  // Sample articles for demonstration
  const allArticles = {
    app: [
      { 
          title: 'Navigating to the Home Screen', 
          content: 'In most mobile apps, returning to the home screen can be done by tapping a dedicated “Home” button, typically located in the bottom navigation bar. Alternatively, some apps use their logo at the top of the screen as a home link. This consistent placement ensures that users can quickly return to the app’s main dashboard from any section, improving ease of navigation and usability.' 
      },
      { 
          title: 'Finding App Navigation Menus', 
          content: 'Mobile apps often use a bottom navigation bar or a “hamburger menu” (three horizontal lines) at the top-left corner to house navigation links. These menus provide access to core sections of the app, such as settings, account details, or key features. This layout keeps navigation intuitive and helps users reach their desired destination quickly.' 
      },
      { 
          title: 'Using In-App Search Functions', 
          content: 'The in-app search bar helps users quickly locate specific content, such as items in a shopping app, videos in a streaming app, or settings in a utility app. Typically represented by a magnifying glass icon, this feature streamlines the user experience by reducing the need to browse through categories manually.' 
      },
      { 
          title: 'Understanding App Notifications', 
          content: 'Mobile apps often send notifications to inform users about updates, reminders, or promotional offers. These notifications can be managed through the app’s settings, where users can customize what types of alerts they want to receive. Understanding these settings helps users stay informed without feeling overwhelmed by unnecessary alerts.' 
      },
      { 
          title: 'Switching Between Tabs or Sections', 
          content: 'Many apps organize content into tabs, typically located at the bottom or top of the screen. Tapping on these tabs switches between different sections without needing to navigate back to the main menu. This design enables seamless multitasking and faster access to key features.' 
      },
      { 
          title: 'Using Gesture-Based Navigation', 
          content: 'Modern apps often incorporate gesture-based navigation, such as swiping left or right to switch pages, pulling down to refresh, or pinching to zoom. These intuitive gestures simplify interaction with the app and reduce the need for multiple button presses, making navigation more fluid and enjoyable.' 
      },
      { 
          title: 'Identifying External Links in Apps', 
          content: 'External links in mobile apps are often marked with an icon, like an arrow pointing outward, and they open in a browser or another app. Recognizing these links ensures users can access additional resources without losing their place within the app. To return to the app, simply switch back using the app switcher on your device.' 
      }
  ]
  ,
    web: [
      { title: 'Returning to the Homepage', content: 'Returning to the homepage from any page on a website is typically done by clicking the website’s logo at the top of the screen. This design convention makes it easy for users to navigate back to the main page without needing to search for a “Home” button or press the browser’s “Back” button multiple times. The logo link provides a consistent way to reorient users, especially on complex websites with many subpages. Knowing this shortcut can make website navigation quicker and more intuitive, allowing users to explore content while always knowing how to return to the start.' },
      { title: 'Locating Navigation Links', content: 'Website navigation links are generally found in the top bar or a sidebar, providing an easy-to-find menu that directs users to important sections. These menus organize the site’s main categories and are usually consistent across pages. For users, especially those who might be less familiar with web layouts, finding the navigation links in a predictable location simplifies browsing. Websites often rely on this structure to give users a clear path to discover new content, read articles, or make purchases. A well-organized navigation system helps ensure a positive user experience, making it easy to explore and stay engaged.' },
      { title: 'Using a Website’s Search Bar', content: 'The search bar on a website is designed to help users find specific information within that site. Unlike a typical web search engine, which browses the entire internet, the site’s search function limits results to its own pages. This tool is especially useful on content-heavy websites, such as news sites or e-commerce platforms, where users might be looking for specific articles or products. Generally located near the top of the page, the search bar allows users to enter keywords to quickly find relevant content without manually browsing. Using it effectively can save time and improve the browsing experience' },
      { title: 'Understanding Hyperlinks', content: 'Hyperlinks are a cornerstone of web navigation, helping users move between pages or sections with a single click. Typically underlined or in a different color, these clickable text elements signal that additional content is available. They can lead to a related page within the same website or an external site, enabling users to easily explore relevant resources. Understanding how to use hyperlinks makes browsing smoother and more interactive, as users don’t have to perform separate searches for new information. The convenience and accessibility of hyperlinks make them a powerful tool for guiding users through content effortlessly.' },
      { title: 'Identifying Links That Open in New Tabs', content: 'Links that open in new tabs often have an icon next to them, such as an arrow pointing outwards or a small square, indicating they will load in a separate tab or window. This is common for external links, where users might want to check other resources without leaving the main site they are browsing. Understanding this visual cue can help users better manage their tabs and windows, especially if they prefer to keep the main website open. By recognizing these links, users can keep their browsing organized, explore additional information, and easily return to the original site.'},
    ],
    desktop: [
      { title: 'Understanding the Desktop Taskbar', content: 'The taskbar on a desktop computer is a critical navigation tool, generally located at the bottom of the screen. It provides access to commonly used apps, open windows, and essential settings. Users can “pin” frequently used applications to the taskbar for easy access. The taskbar also displays open programs, making it easy to switch between them with a single click. Additionally, features like the Start menu and the system tray are usually located on the taskbar. Understanding how to customize and use the taskbar effectively helps users organize their desktop and quickly access important functions and applications.' },
      { title: 'Navigating with the Start Menu', content: 'The Start menu is a central hub for accessing files, applications, and settings on a desktop computer. Located on the taskbar, it opens with a click on the Start button (often a Windows logo) or by pressing the Windows key. The Start menu provides shortcuts to recently used files, commonly used apps, and all installed programs. It often includes links to essential functions like settings, power options, and file management. Learning to use the Start menu can save time, as it consolidates many important tools in one location, making desktop navigation straightforward and efficient.' },
      { title: 'Switching Between Open Windows', content: 'Switching between open windows is an essential navigation skill for desktop users. One of the quickest ways to switch is by using the Alt + Tab keyboard shortcut, which opens a preview of all active windows. Holding down Alt and pressing Tab repeatedly lets users cycle through open applications until they reach the desired one. Alternatively, clicking on the window’s icon in the taskbar also works. Understanding these shortcuts helps users multitask effectively, avoiding the need to search manually for open programs and enhancing productivity by simplifying transitions between tasks.' },
      { title: 'Using the System Tray', content: 'The system tray, located in the bottom-right corner of the taskbar, displays important system information and icons. It includes controls for volume, Wi-Fi, battery (on laptops), and other background applications, as well as notifications. Clicking these icons allows users to adjust settings or view alerts without navigating to the main settings menu. For instance, users can quickly connect to Wi-Fi networks or adjust volume levels. The system tray keeps essential functions easily accessible, helping users manage their device’s system settings and notifications efficiently while working on other tasks.' },
      { title: ' The “Show Desktop” Function', content: 'The “Show Desktop” function is a handy tool for minimizing all open windows instantly to reveal the desktop. This option is typically located at the far right of the taskbar or can be accessed using the Windows + D keyboard shortcut. It’s helpful for users who need quick access to desktop files, folders, or shortcuts without closing any active applications. When clicked again, the function restores all minimized windows to their previous positions. Mastering the “Show Desktop” feature enables users to declutter their screen instantly and improves overall desktop navigation.' },
    ],
    android: [
      { title: 'Using the Home Button', content: 'The Home button on an Android device allows users to quickly return to the home screen from any app or screen. It’s usually located at the bottom of the screen and serves as a central navigation feature. Pressing the Home button doesn’t close the app; instead, it minimizes it so that users can return to it later. This function helps users quickly switch between apps or exit to the main screen without losing progress. Understanding the Home button is key to efficiently navigating Android devices, keeping important apps just a tap away while staying organized.' },
      { title: 'Navigating with the Back Button', content: 'The Back button, located at the bottom of most Android screens, is crucial for navigation. This button allows users to move one step back within an app, such as going from a specific setting back to the main settings menu or returning to a previous page in a browser. It also helps exit apps, returning users to the home screen. Understanding the Back button’s function enables smooth navigation, reducing confusion and preventing accidental exits. With the Back button, users can retrace their steps easily, creating a more user-friendly and controlled Android experience.' },
      { title: 'Switching Apps with the Recent Apps Button', content: 'The Recent Apps button, typically found at the bottom of Android devices, helps users switch quickly between recently used apps. Tapping this button opens a view of all recently opened apps, displayed as cards or windows. Users can tap on any app to return to it instantly, allowing multitasking without reopening or losing progress. Swiping an app off the screen removes it from the list, which helps free up memory. Knowing how to use the Recent Apps button efficiently makes switching between tasks seamless and is particularly helpful for productivity, gaming, or following instructions across multiple apps.' },
      { title: 'Understanding the App Drawer', content: 'The App Drawer on Android is a screen where all installed apps are displayed, typically accessed by swiping up on the home screen or tapping an icon. Unlike the home screen, which holds only frequently used or favorite apps, the App Drawer organizes all apps alphabetically or by category, depending on user preferences. It allows users to locate apps they may not use frequently without cluttering the main screen. Knowing how to access and organize the App Drawer can make Android navigation more organized, ensuring that apps are easy to find when needed but don’t overwhelm the home screen.' },
      { title: ' Using Notification Shade and Quick Settings', content: 'The Notification Shade is accessed by swiping down from the top of the Android screen. It displays notifications from apps, such as messages, social media updates, or reminders. Pulling down twice (or swiping down with two fingers) opens Quick Settings, providing fast access to important settings like Wi-Fi, Bluetooth, brightness, and airplane mode. This feature allows users to quickly control device settings without navigating deep into menus. Familiarity with the Notification Shade and Quick Settings makes Android navigation faster, letting users address notifications or make adjustments conveniently from any screen.' },
      
    ],
  };

  useEffect(() => {
    const handlePopState = (event) => {
      // When the user presses the "Back" button, navigate to home
      navigate('/');
    };

    // Listen to the popstate event
    window.addEventListener('popstate', handlePopState);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);


  useEffect(() => {
    // Dynamically load articles based on category and score
    const categoryArticles = allArticles[category] || [];
    const filteredArticles = score >= 3 ? categoryArticles.slice(2) : categoryArticles.slice(0, 4);
    setArticles(filteredArticles);
  }, [category, score]);

  return (
    <div> 
             <Header />
    <div className="articles-container">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Articles</h1>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-card">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ArticlesPage;
