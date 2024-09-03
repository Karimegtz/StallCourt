const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3 className="text-white">No Comments Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block text-white"
        style={{ borderBottom: '1px dotted #444' }}
      >
        Be the first to chime in!
      </h3>
      <div className="flex-row my-4">
        {comments &&
          comments.map((comment) => (
            <div key={comment._id} className="col-12 mb-3 pb-3">
              <div className="p-3" style={{ backgroundColor: '#2C2C3E', color: '#E0E0E0', borderRadius: '8px' }}>
                <h5 className="card-header" style={{ backgroundColor: '#444', color: '#F1C40F', borderRadius: '5px', padding: '0.5rem' }}>
                  {comment.commentAuthor} Dropped a thought{' '}
                  <span style={{ fontSize: '0.825rem', color: '#E0E0E0' }}>
                    on {comment.createdAt}
                  </span>
                </h5>
                <p className="card-body" style={{ marginTop: '0.5rem', color: '#E0E0E0' }}>{comment.commentText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default CommentList;
