"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface UserProfile {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  dateOfBirth?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  preferences: {
    newsletter: boolean
    smsNotifications: boolean
    orderUpdates: boolean
  }
  memberSince: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=100&width=100",
    dateOfBirth: "1990-01-15",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    preferences: {
      newsletter: true,
      smsNotifications: false,
      orderUpdates: true,
    },
    memberSince: "2023-01-15",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  useEffect(() => {
    // Fetch user profile from API
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      // Replace with actual API call
      const response = await fetch("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setEditedProfile(data)
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      // Replace with actual API call
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(editedProfile),
      })

      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setIsEditing(false)
        setMessage({ type: "success", text: "Profile updated successfully!" })
      } else {
        setMessage({ type: "error", text: "Failed to update profile. Please try again." })
      }
    } catch (error) {
      setMessage({ type: "error", text: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
    setMessage(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handlePreferenceChange = (field: string, value: boolean) => {
    setEditedProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {message && (
        <Alert
          className={`mb-6 ${message.type === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
        >
          <AlertDescription className={message.type === "error" ? "text-red-800" : "text-green-800"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details and contact information</CardDescription>
                </div>
                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button variant="outline" size="sm" onClick={handleCancel} disabled={isLoading}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave} disabled={isLoading}>
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={profile.avatar || "/placeholder.svg"}
                    alt={`${profile.firstName} ${profile.lastName}`}
                  />
                  <AvatarFallback className="text-lg">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-muted-foreground">
                    Member since {new Date(profile.memberSince).toLocaleDateString()}
                  </p>
                  {isEditing && (
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Photo
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editedProfile.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.firstName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editedProfile.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.lastName}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedProfile.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  {isEditing ? (
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={editedProfile.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "Not set"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>Manage your default shipping address</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                {isEditing ? (
                  <Textarea
                    id="street"
                    value={editedProfile.address.street}
                    onChange={(e) => handleAddressChange("street", e.target.value)}
                    placeholder="Enter your street address"
                  />
                ) : (
                  <div className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profile.address.street}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      value={editedProfile.address.city}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/50">{profile.address.city}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  {isEditing ? (
                    <Input
                      id="state"
                      value={editedProfile.address.state}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/50">{profile.address.state}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={editedProfile.address.zipCode}
                      onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/50">{profile.address.zipCode}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  {isEditing ? (
                    <Input
                      id="country"
                      value={editedProfile.address.country}
                      onChange={(e) => handleAddressChange("country", e.target.value)}
                    />
                  ) : (
                    <div className="p-2 border rounded-md bg-muted/50">{profile.address.country}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Communication Preferences</CardTitle>
              <CardDescription>Choose how you'd like to receive updates from us</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newsletter">Newsletter</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive our weekly newsletter with deals and updates
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={isEditing ? editedProfile.preferences.newsletter : profile.preferences.newsletter}
                    onChange={(e) => isEditing && handlePreferenceChange("newsletter", e.target.checked)}
                    disabled={!isEditing}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get text messages for important updates</p>
                  </div>
                  <input
                    type="checkbox"
                    id="smsNotifications"
                    checked={
                      isEditing ? editedProfile.preferences.smsNotifications : profile.preferences.smsNotifications
                    }
                    onChange={(e) => isEditing && handlePreferenceChange("smsNotifications", e.target.checked)}
                    disabled={!isEditing}
                    className="h-4 w-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="orderUpdates">Order Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about your order status</p>
                  </div>
                  <input
                    type="checkbox"
                    id="orderUpdates"
                    checked={isEditing ? editedProfile.preferences.orderUpdates : profile.preferences.orderUpdates}
                    onChange={(e) => isEditing && handlePreferenceChange("orderUpdates", e.target.checked)}
                    disabled={!isEditing}
                    className="h-4 w-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
