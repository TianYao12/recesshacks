import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";

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
        body: JSON.stringify({commentId}),
        headers:  {
          "Content-Type": "application/json",
        }
      })
      if(response.ok) {
        fetchDiseases();
      }
    } catch(error) {
      console.error("Error when deleting", error);
    }
  }

  return (
    <>
      <h1>Testing</h1>
      {client &&
        comments.map((comment, index) => (
          <div key={comment.id} index={index}>
            <h1>{comment.text}</h1>
            <p>
              Date: {comment.date.month}/{comment.date.day}/{comment.date.hour}
            </p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
          </div>
        ))}
    </>
  );
}