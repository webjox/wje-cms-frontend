export default function Custom404() {
    return (
      <div className="notFound">
        <style jsx global>
          {`
          .notFound { 
            background: url('/404.png')!important;
            background-repeat: no-repeat;
            overflow: hidden;
            background-size: cover!important;
            min-height: 100vh;
          }
          `}
        </style>
      </div>
    )
  }