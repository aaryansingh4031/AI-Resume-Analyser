import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import { resumes } from "../../constants/index";
import ResumeCard from "../components/ResumeCard";
import "../app.css";
import React, { useEffect } from 'react'
import { usePuterStore } from '~/lib/puter';
import { useLocation, useNavigate, useNavigation } from 'react-router';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1];
  const navigate = useNavigate();

  useEffect(() => {
  if (!auth.isAuthenticated && !location.pathname.startsWith('/auth')) {
    navigate(`/auth?next=${location.pathname}`);
  }
}, [auth.isAuthenticated, location.pathname]);


  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar />
    
    <section className="main-section">
      <div className="page-heading py-16">
        <h1>Track Your Applications & Resume Ratings</h1>
        <h2>Review your submissions and check AI-powered feedback</h2>
      </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
            <div>
              <ResumeCard key={resume.id} resume={resume} />
            </div>

          ))}
        </div>
      )}
    </section>
  </main>
}
