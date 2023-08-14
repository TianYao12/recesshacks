import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import {BsTrash3} from 'react-icons/bs'

export default function Tracking() {
  const router = useRouter();
  const { history } = router.query;
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
    console.log(data);
  };

  const handleDelete = async (commentId) => {
    try {
      const session = await getSession();
      const userID = session.user.id;
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
        body: JSON.stringify({ commentId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        fetchDiseases();
      }
    } catch (error) {
      console.error("Error when deleting", error);
    }
  };

  return (
    <>
      <div className="history-container">
        <h1 className="history-header">Your History</h1>
        <p className="para">Keep of your illness for future reference</p>
        {client &&
          comments.map((comment, index) => (
            <div className="disease-container" key={comment.id} index={index}>
              <div className="child-container">
                <h1>{comment.text}</h1>
                <p>
                  Date: {comment.date.month}/{comment.date.day}/
                  {comment.date.hour}
                </p>
              </div>
              <button className="history-btn" onClick={() => handleDelete(comment.id)}><BsTrash3/></button>
            </div>
          ))}
      </div>
    </>
  );
}
