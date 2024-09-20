import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

const AccordionItem = ({ title, content, isOpen, onClick }) => {
  const contentRef = useRef(null);

  // Set maxHeight for open items based on content size
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = "0px";
    }
  }, [isOpen]);

  return (
    <div className={`accordion-item ${isOpen ? "active" : ""}`}>
      <button
        className="accordion-title"
        aria-expanded={isOpen}
        onClick={onClick}
        aria-controls={`content-${title}`}
      >
        <h3>{title}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      <div
        id={`content-${title}`}
        ref={contentRef}
        className={`accordion-content ${isOpen ? "open" : ""}`}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

const Accordion = ({ items, defaultOpenIndex = 0 }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

const Component = () => {
  const accordionData = [
    {
      title: "Section 1",
      content: "This is the content of section 1",
    },
    {
      title: "Section 2",
      content: "This is the content of section 2",
    },
    {
      title: "Section 3",
      content: "This is the content of section 3",
    },
  ];

  return (
    <div>
      <h2>Modern Accordion</h2>
      <Accordion items={accordionData} defaultOpenIndex={0} />
    </div>
  );
};

export default Component;
