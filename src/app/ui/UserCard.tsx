type Props = {
  user: User
}

export default function UserCard({ user }: Props){
  return (
    <div className="[&_*]:m-auto text-center">
      <p>{ user.name }</p>
      <img className="rounded-full" src={user.image || ''} alt="profile picture" />
      <p>{ user.email }</p>
    </div>
  );
}