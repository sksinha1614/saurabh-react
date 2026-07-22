import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy",
        location: "Default",
        avatar_url: null,
      },
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://api.github.com/users/sksinha1614");

      const json = await response.json();

      this.setState({
        userInfo: json,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    return (
      <div className="user-card">
        {avatar_url && (
          <img src={avatar_url} alt={name} width="150" height="150" />
        )}

        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>Contact: @sksinha1614</h4>
      </div>
    );
  }
}

export default UserClass;
