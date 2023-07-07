import cookie from "cookie"

export async function POST(req) {
    const data = await req.json()

    const httpCookie = cookie.serialize("token",data.token,{
        httpOnly: true,
        maxAge: 60*60,
        sameSite: "strict",
        path:"/"
    })
    
    return new Response('Hello, Next.js!', {
        status: 200,
        headers: { 'Set-Cookie': httpCookie},
      })
}

