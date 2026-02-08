import React, { useEffect, useRef } from "react";
import "./MainPage.css";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const navigate = useNavigate();
  const statsRef = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    function animateCounters() {
      const counters = document.querySelectorAll(".stat-number");

      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - (1 - progress) * (1 - progress);

          counter.textContent = Math.floor(ease * target).toLocaleString();

          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = target.toLocaleString();
        }

        requestAnimationFrame(update);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted.current) {
            counted.current = true;
            animateCounters();
          }
        });
      },
      { threshold: 0.4 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  // click pulse
  useEffect(() => {
    const boxes = document.querySelectorAll(".feature-box");

    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        box.style.transition = "transform 0.15s ease";
        box.style.transform = "scale(0.95)";
        setTimeout(() => {
          box.style.transition = "transform 0.3s ease";
          box.style.transform = "";
        }, 150);
      });
    });
  }, []);

  return (
    <div className="main-page">
      {/* NAV */}
      <nav className="navbar">
        <div className="logo">✦ MY GYM SPACE</div>
        <ul className="nav-links">
          <li><a href="#features">Classes</a></li>
          <li><a href="#stats">Stats</a></li>
          <li><a href="#cta">Get Started</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Discover New Classes</h1>
        <p>
          A beautifully crafted showcase of what's possible. Explore,
          interact, and get inspired by our fitness classes & many more.
        </p>
      </section>

      {/* Classes */}
      <section id="features">
        <div className="section-title">
          <h2>Explore</h2> 
        </div>

        <div className="carousel">
        <div className="carousel-track">
          {[
            ["Mountains", "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80"],
            ["Ocean", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"],
            ["Forest", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80"],
            ["Aurora", "https://images.unsplash.com/photo-1473081556163-2a17de81fc97?w=400&q=80"],
            ["Valley", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80"],
            ["Desert", "https://images.unsplash.com/photo-1518173946687-a544bf64be6e?w=400&q=80"],
            ["Sunrise", "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=80"],
            ["Starry Night", "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80"],
          ].map(([title, img]) => (
            <div className="feature-box" key={title}>
              <img src={img} alt={title} />
              <div className="feature-overlay"></div>
              <h3>{title}</h3>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* STATS */}
      <section id="stats" ref={statsRef}>
        <div className="section-title">
          <h2>By The Numbers</h2>
          <p>Growing every single day</p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <div className="stat-number" data-target="12457">0</div>
            <div className="stat-label">Visits</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-number" data-target="9800">0</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-target="365">0</div>
            <div className="stat-label">Days Active</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="cta">
        <h2>Ready to Dive In?</h2>
        <p>Join thousands of members who already love GymSpace.</p>
        <button onClick={() => navigate("./UserLogin")} className="cta-btn">Get Started Free</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>- made by devesh.</p>
      </footer>
    </div>
  );
}
