import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import { MapPin, Code2, Users, Clock, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { getUser } from "../../api/user.api";


const ProfilePage = () => {
  const user = useAuthStore(state => state.user);
useEffect(()=>{
  const fetchUserData=async()=>{
  const responce = await getUser()

  }
})


  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column - Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative">
                <img 
                  src={user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026024d"} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{user?.name || ""}</h2>
                    <p className="text-slate-500">{user?.email}</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
                
                <p className="text-slate-600 mb-4 max-w-md">
                  Passionate about coding and building products. Currently learning full-stack development with React and Node.js.
                </p>
                
                <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>India</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="w-full rounded-none border-b border-slate-200 bg-transparent h-auto p-0 flex justify-start">
                  <TabsTrigger 
                    value="account" 
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 data-[state=active]:shadow-none font-medium"
                  >
                    Account Info
                  </TabsTrigger>
                  <TabsTrigger 
                    value="activity"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-4 data-[state=active]:shadow-none font-medium"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 py-4 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-500">Full Name</span>
                      <span className="sm:col-span-2 text-sm text-slate-900">{user?.name || "Alex Kumar"}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 py-4 border-b border-slate-100">
                      <span className="text-sm font-medium text-slate-500">Email</span>
                      <span className="sm:col-span-2 text-sm text-slate-900">{user?.email || "alex.kumar@example.com"}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 py-4">
                      <span className="text-sm font-medium text-slate-500">Bio</span>
                      <span className="sm:col-span-2 text-sm text-slate-900">Passionate about coding and building products. Currently learning full-stack development with React and Node.js.</span>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="p-6 text-slate-500">
                  Detailed activity log will appear here.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Recent Activity */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-6">Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Rooms Created</span>
                  </div>
                  <span className="font-semibold text-slate-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Rooms Joined</span>
                  </div>
                  <span className="font-semibold text-slate-900">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm">Total Hours</span>
                  </div>
                  <span className="font-semibold text-slate-900">36h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg text-slate-900 mb-6">Recent Activity</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-green-100 text-green-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-100 bg-white shadow-sm flex items-start gap-3 text-sm">
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">Joined DSA Study Group</p>
                      <p className="text-slate-500 text-xs mt-1">Today</p>
                    </div>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-blue-100 text-blue-600 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-100 bg-white shadow-sm flex items-start gap-3 text-sm">
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">Created Web Dev Room</p>
                      <p className="text-slate-500 text-xs mt-1">Yesterday</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-slate-100 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-slate-100 bg-white shadow-sm flex items-start gap-3 text-sm">
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">Joined Algorithm Group</p>
                      <p className="text-slate-500 text-xs mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
