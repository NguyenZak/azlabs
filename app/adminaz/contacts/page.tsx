"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search,
  Loader2,
  X,
  MessageSquare,
  User,
  Building,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { getContacts, updateContactStatus, deleteContact } from "@/lib/actions/cms";
import toast from "react-hot-toast";

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await updateContactStatus(id, status);
      toast.success(`Status updated to ${status}`);
      loadContacts();
      if (selectedContact?.id === id) {
        setSelectedContact({ ...selectedContact, status });
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    try {
      await deleteContact(id);
      toast.success("Submission deleted");
      loadContacts();
      setSelectedContact(null);
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-white">Inquiries</h1>
          <p className="text-neutral-400 mt-2 text-lg font-medium">Manage incoming requests and potential leads.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <a 
            href="/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-neutral-950/60 border border-neutral-800 px-6 py-4 rounded-full font-bold hover:bg-apple-bg transition-all shadow-sm text-blue-500 whitespace-nowrap"
            title="View on site"
          >
            <ExternalLink className="w-5 h-5" />
            View Site
          </a>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input 
              type="text" 
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-neutral-950/60 border border-neutral-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50/20 transition-all shadow-sm font-medium"
            />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="py-40 flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
          <p className="text-neutral-400 font-medium animate-pulse">Retrieving messages...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List Column */}
          <div className="lg:col-span-1 space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {filteredContacts.length === 0 ? (
              <div className="py-20 text-center bg-neutral-950/60 rounded-[32px] border border-dashed border-neutral-800">
                <Mail className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
                <p className="text-neutral-400 font-bold">No messages found</p>
              </div>
            ) : filteredContacts.map((contact) => (
              <motion.div 
                key={contact.id}
                layout
                onClick={() => {
                  setSelectedContact(contact);
                  if (contact.status === 'new') handleStatusUpdate(contact.id, 'read');
                }}
                className={`p-6 rounded-[32px] border transition-all cursor-pointer group relative ${
                  selectedContact?.id === contact.id 
                    ? "bg-black border-black text-white shadow-2xl" 
                    : "bg-neutral-950/60 border-neutral-800 hover:border-black/10 hover:shadow-xl"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {contact.status === 'new' && (
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    )}
                    <p className={`text-[10px] font-black uppercase tracking-widest ${
                      selectedContact?.id === contact.id ? "text-white/60" : "text-neutral-400"
                    }`}>
                      {new Date(contact.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                    contact.status === 'new' ? "bg-blue-600 text-white" : 
                    contact.status === 'read' ? "bg-blue-50 text-blue-500" : "bg-neutral-800 text-gray-500"
                  }`}>
                    {contact.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{contact.name}</h3>
                <p className={`text-sm line-clamp-2 ${
                  selectedContact?.id === contact.id ? "text-white/70" : "text-neutral-400"
                }`}>
                  {contact.message}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Detail Column */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedContact ? (
                <motion.div 
                  key={selectedContact.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-neutral-950/60 rounded-[48px] border border-neutral-800 shadow-2xl p-10 md:p-16 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 flex gap-2">
                    <button 
                      onClick={() => handleStatusUpdate(selectedContact.id, selectedContact.status === 'archived' ? 'read' : 'archived')}
                      className={`p-3 rounded-2xl transition-all ${
                        selectedContact.status === 'archived' ? "bg-yellow-50 text-yellow-600" : "bg-neutral-900/50 text-neutral-400 hover:bg-neutral-800"
                      }`}
                      title="Archive"
                    >
                      <Clock className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => handleDelete(selectedContact.id)}
                      className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-12">
                    <header className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-black rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                          {selectedContact.name[0]}
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-white">{selectedContact.name}</h2>
                          <div className="flex items-center gap-2 text-neutral-400 font-medium">
                            <Mail className="w-4 h-4" />
                            {selectedContact.email}
                          </div>
                        </div>
                      </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-6 bg-neutral-900/50 rounded-3xl space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                          <User className="w-3 h-3" /> Sender Name
                        </div>
                        <p className="font-bold text-lg">{selectedContact.name}</p>
                      </div>
                      <div className="p-6 bg-neutral-900/50 rounded-3xl space-y-1">
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                          <Building className="w-3 h-3" /> Company
                        </div>
                        <p className="font-bold text-lg">{selectedContact.company || "N/A"}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-neutral-400 px-2">
                        <MessageSquare className="w-3 h-3" /> Message Content
                      </div>
                      <div className="p-10 bg-neutral-950/60 border border-neutral-800 rounded-[40px] text-xl leading-relaxed text-white font-medium shadow-sm italic">
                        "{selectedContact.message}"
                      </div>
                    </div>

                    <footer className="pt-8 flex justify-between items-center border-t border-neutral-800">
                      <div className="text-sm text-neutral-400">
                        Submitted on {new Date(selectedContact.created_at).toLocaleString()}
                      </div>
                      <a 
                        href={`mailto:${selectedContact.email}`}
                        className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-full font-bold shadow-xl hover:opacity-90 transition-all"
                      >
                        <Mail className="w-5 h-5" />
                        Reply via Email
                      </a>
                    </footer>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-40 bg-neutral-900/50/50 rounded-[48px] border-2 border-dashed border-neutral-800">
                  <div className="w-24 h-24 bg-neutral-950/60 rounded-full flex items-center justify-center shadow-sm mb-6">
                    <ChevronRight className="w-10 h-10 text-neutral-400 opacity-20" />
                  </div>
                  <h3 className="text-2xl font-bold text-white opacity-40">Select a message to preview</h3>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
